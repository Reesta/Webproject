import { jest } from '@jest/globals';
import { authController } from '../src/controller/auth/authController.js';
import { User } from '../src/models/index.js';
import bcrypt from 'bcrypt';

jest.mock('../src/models/index.js');

describe('Admin Auth Controller Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('adminLogin', () => {
    it('should login admin successfully with valid credentials', async () => {
      const req = {
        body: {
          email: 'admin@example.com',
          password: 'adminpass'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue({
        toJSON: () => ({
          email: 'admin@example.com',
          password: 'hashedpassword',
          role: 'admin'
        }),
        password: 'hashedpassword',
        role: 'admin'
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      await authController.adminLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          user: expect.objectContaining({ email: 'admin@example.com' }),
          access_token: expect.any(String)
        }),
        message: 'Admin successfully logged in'
      }));
    });

    it('should fail admin login with invalid password', async () => {
      const req = {
        body: {
          email: 'admin@example.com',
          password: 'wrongpass'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue({
        password: 'hashedpassword',
        role: 'admin'
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await authController.adminLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should fail admin login if user is not admin', async () => {
      const req = {
        body: {
          email: 'user2@example.com',
          password: 'userpass'
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

      await authController.adminLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ message: 'Access denied. Admin privileges required.' });
    });
  });

  describe('adminSignup', () => {
    it('should create admin user successfully', async () => {
      const req = {
        body: {
          email: 'newadmin@example.com',
          password: 'newadminpass'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        toJSON: () => ({
          email: 'newadmin@example.com',
          role: 'admin'
        })
      });
      bcrypt.hash = jest.fn().mockResolvedValue('hashedpassword');

      await authController.adminSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          user: expect.objectContaining({ email: 'newadmin@example.com' })
        }),
        message: 'Successfully created admin'
      }));
    });

    it('should fail to create admin with existing email', async () => {
      const req = {
        body: {
          email: 'admin@example.com',
          password: 'adminpass'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue({
        email: 'admin@example.com'
      });

      await authController.adminSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Admin already exists' });
    });
  });
});
