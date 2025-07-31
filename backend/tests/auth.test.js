const { jest } = require('@jest/globals');
const { authController } = require('../src/controller/auth/authController.js');
const { User } = require('../src/models/index.js');
const bcrypt = require('bcrypt');

jest.mock('../src/models/index.js');

describe('Auth Controller Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        toJSON: () => ({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'hashedpassword',
          role: 'user'
        })
      });
      bcrypt.hash = jest.fn().mockResolvedValue('hashedpassword');

      await authController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          user: expect.objectContaining({ email: 'john@example.com' })
        }),
        message: 'successfully created user'
      }));
    });

    it('should fail to create user with missing fields', async () => {
      const req = {
        body: {
          firstName: 'Jane'
          // missing lastName, email, password
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await authController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid paylod' });
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const req = {
        body: {
          email: 'alice@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue({
        toJSON: () => ({
          email: 'alice@example.com',
          password: 'hashedpassword',
          role: 'user'
        }),
        password: 'hashedpassword',
        role: 'user'
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          user: expect.objectContaining({ email: 'alice@example.com' }),
          access_token: expect.any(String),
          isAdmin: false
        }),
        message: 'Successfully logged in'
      }));
    });

    it('should fail login with invalid password', async () => {
      const req = {
        body: {
          email: 'alice@example.com',
          password: 'wrongpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue({
        password: 'hashedpassword',
        role: 'user'
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });
});
