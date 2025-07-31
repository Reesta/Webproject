import { jest } from '@jest/globals';
import { userController } from '../src/controller/user/userController.js';
import { User } from '../src/models/index.js';

jest.mock('../src/models/index.js');

describe('User Controller Additional Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('update', () => {
    it('should update existing user successfully', async () => {
      const req = {
        params: { id: 1 },
        body: {
          name: 'Updated User',
          email: 'updateduser@example.com',
          password: 'newpass'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      const oldUser = {
        name: 'Old User',
        email: 'olduser@example.com',
        password: 'oldpass',
        save: jest.fn()
      };

      User.findOne.mockResolvedValue(oldUser);

      await userController.update(req, res);

      expect(oldUser.name).toBe('Updated User');
      expect(oldUser.email).toBe('updateduser@example.com');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        data: oldUser,
        message: 'user updated successfully'
      }));
    });

    it('should return 500 if user not found for update', async () => {
      const req = {
        params: { id: 999 },
        body: {
          name: 'Nonexistent User',
          email: 'nonexistent@example.com',
          password: 'pass'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue(null);

      await userController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('deleteById', () => {
    it('should delete user successfully', async () => {
      const req = {
        params: { id: 1 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      const oldUser = {
        destroy: jest.fn()
      };

      User.findOne.mockResolvedValue(oldUser);

      await userController.deleteById(req, res);

      expect(oldUser.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: 'user deleted successfully' });
    });

    it('should return 500 if user not found for delete', async () => {
      const req = {
        params: { id: 999 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue(null);

      await userController.deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
});
