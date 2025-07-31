import { jest } from '@jest/globals';
import { userController } from '../src/controller/user/userController.js';
import { User } from '../src/models/index.js';
import bcrypt from 'bcrypt';

jest.mock('../src/models/index.js');

describe('User Controller Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'testpass'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.create.mockResolvedValue({
        toJSON: () => ({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'hashedpassword'
        })
      });

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ email: 'testuser@example.com' }),
        message: 'successfully created user'
      }));
    });

    it('should fail to create user with missing fields', async () => {
      const req = {
        body: {
          name: 'Test User'
          // missing email and password
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await userController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Invalid paylod' });
    });
  });

  describe('getById', () => {
    it('should fetch user by id', async () => {
      const req = {
        user: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue({
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        phone: '1234567890',
        address: '123 Test St',
        profileImage: 'image.png',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'user fetched successfully',
        data: expect.objectContaining({ email: 'testuser@example.com' })
      }));
    });

    it('should return 401 if no user id', async () => {
      const req = {
        user: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await userController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });
  });
});
