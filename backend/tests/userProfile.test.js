import { jest } from '@jest/globals';
import { userController } from '../src/controller/user/userController.js';
import { User } from '../src/models/index.js';
import bcrypt from 'bcrypt';

jest.mock('../src/models/index.js');

describe('User Profile and Password Change Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      const req = {
        user: { id: 1 },
        body: {
          name: 'Updated Profile',
          email: 'updatedprofile@example.com',
          phone: '1234567890',
          address: '123 Test St',
          profileImage: 'image.png'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      User.findOne.mockResolvedValue({
        firstName: 'Old',
        lastName: 'Name',
        email: 'old@example.com',
        phone: '0000000000',
        address: 'Old Address',
        profileImage: 'old.png',
        save: jest.fn()
      });

      await userController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
        message: 'user profile updated successfully',
        data: expect.any(Object)
      }));
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const req = {
        user: { id: 1 },
        body: {
          currentPassword: 'userpass',
          newPassword: 'newpassword123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue({
        password: 'hashedpassword',
        save: jest.fn()
      });
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      bcrypt.hash = jest.fn().mockResolvedValue('newhashedpassword');

      await userController.changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password changed successfully' });
    });

    it('should fail to change password with wrong current password', async () => {
      const req = {
        user: { id: 1 },
        body: {
          currentPassword: 'wrongpass',
          newPassword: 'newpassword123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue({
        password: 'hashedpassword'
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await userController.changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Current password is incorrect' });
    });
  });
});
