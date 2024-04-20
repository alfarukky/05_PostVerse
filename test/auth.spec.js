import bcrypt from 'bcrypt';
import * as authController from '../src/controllers/auth.controller.js';
import * as authServices from '../src/services/auth.services.js';

jest.mock('../src/services/auth.services.js');

describe('Auth Controller', () => {
  describe('register', () => {
    it('should register a new user with hashed password', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // Correctly mock the bcrypt.hash function
      bcrypt.hash = jest.fn().mockResolvedValueOnce('hashedPassword');

      authServices.register.mockResolvedValueOnce({
        message: 'User created successfully',
        data: {
          id: 'user_id',
          name: 'Test User',
          email: 'test@example.com',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });

      await authController.register(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        data: expect.objectContaining({
          id: expect.any(String),
          name: 'Test User',
          email: 'test@example.com',
          updatedAt: expect.any(Date),
          createdAt: expect.any(Date),
        }),
      });
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      authServices.login.mockResolvedValueOnce({
        message: 'Login successful',
        data: {
          acessToken: 'access_token',
          user: {
            id: 'user_id',
            name: 'Test User',
            email: 'test@example.com',
            updateAt: new Date(),
            createAt: new Date(),
          },
        },
      });

      await authController.login(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        data: expect.objectContaining({
          acessToken: 'access_token',
          user: expect.objectContaining({
            id: 'user_id',
            name: 'Test User',
            email: 'test@example.com',
            updateAt: expect.any(Date),
            createAt: expect.any(Date),
          }),
        }),
      });
    });
  });
});
