import bcrypt from 'bcrypt';

// ============================================
// UNIT TESTS — auth.service.ts
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 09: Testing con Jest
// ============================================

// IMPORTANTE: jest.mock() debe ir ANTES de los imports que lo usan
jest.mock('../repositories/users.repository');
jest.mock('../utils/jwt', () => ({
  signAccessToken: jest.fn().mockReturnValue('mock-access-token'),
  signRefreshToken: jest.fn().mockReturnValue('mock-refresh-token'),
  verifyRefreshToken: jest.fn().mockReturnValue({ sub: 'user-id-123' }),
}));

import * as usersRepo from '../repositories/users.repository';
import * as authService from '../services/auth.service';
import { AppError } from '../errors/AppError';

// Cast para que TypeScript reconozca los métodos mock
const mockFindByEmail = usersRepo.findByEmail as jest.MockedFunction<
  typeof usersRepo.findByEmail
>;
const mockFindByEmailWithPassword = usersRepo.findByEmailWithPassword as jest.MockedFunction<
  typeof usersRepo.findByEmailWithPassword
>;
const mockCreate = usersRepo.create as jest.MockedFunction<
  typeof usersRepo.create
>;
const mockUpdateRefreshToken = usersRepo.updateRefreshToken as jest.MockedFunction<
  typeof usersRepo.updateRefreshToken
>;
const mockFindById = usersRepo.findById as jest.MockedFunction<
  typeof usersRepo.findById
>;

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ─────────────────────────────────────────────
  // register()
  // ─────────────────────────────────────────────

  describe('register', () => {
    const registerDto = {
      name: 'Alice',
      email: 'alice@test.com',
      password: 'Password1!',
    };

    it('should create a user when email is not taken', async () => {
      // Arrange
      mockFindByEmail.mockResolvedValue(null);
      mockCreate.mockResolvedValue({
        _id: { toString: () => 'user-id-123' },
        name: registerDto.name,
        email: registerDto.email,
        role: 'user',
      } as any);

      // Act
      const result = await authService.register(registerDto);

      // Assert
      expect(mockFindByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(result.email).toBe(registerDto.email);
      expect(result.role).toBe('user');
    });

    it('should hash the password before creating', async () => {
      // Arrange
      mockFindByEmail.mockResolvedValue(null);
      mockCreate.mockResolvedValue({
        _id: { toString: () => 'user-id-123' },
        name: registerDto.name,
        email: registerDto.email,
        role: 'user',
      } as any);

      // Act
      await authService.register(registerDto);

      // Assert
      const createCall = mockCreate.mock.calls[0][0];
      expect(createCall.password).not.toBe(registerDto.password);
      expect(createCall.password).toMatch(/^\$2[aby]?\$/);
    });

    it('should throw AppError(409) when email is already taken', async () => {
      // Arrange
      mockFindByEmail.mockResolvedValue({
        _id: 'existing-id',
        email: registerDto.email,
        name: 'Existing User',
        role: 'user',
      } as any);

      // Act & Assert
      await expect(authService.register(registerDto)).rejects.toMatchObject({
        statusCode: 409,
      });
      await expect(authService.register(registerDto)).rejects.toThrow(
        'El email ya está registrado'
      );
    });
  });

  // ─────────────────────────────────────────────
  // login()
  // ─────────────────────────────────────────────

  describe('login', () => {
    const loginDto = {
      email: 'alice@test.com',
      password: 'Password1!',
    };

    it('should return tokens when credentials are valid', async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash(loginDto.password, 1);
      mockFindByEmailWithPassword.mockResolvedValue({
        _id: { toString: () => 'user-id-123' },
        email: loginDto.email,
        password: hashedPassword,
        role: 'user',
      } as any);
      mockUpdateRefreshToken.mockResolvedValue(undefined);

      // Act
      const result = await authService.login(loginDto);

      // Assert
      expect(result.accessToken).toBe('mock-access-token');
      expect(result.refreshToken).toBe('mock-refresh-token');
      expect(result.accessMaxAge).toBe(15 * 60 * 1000);
      expect(result.refreshMaxAge).toBe(7 * 24 * 60 * 60 * 1000);
    });

    it('should throw AppError(401) when user does not exist', async () => {
      // Arrange
      mockFindByEmailWithPassword.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.login(loginDto)).rejects.toMatchObject({
        statusCode: 401,
      });
      await expect(authService.login(loginDto)).rejects.toThrow(
        'Credenciales inválidas'
      );
    });

    it('should throw AppError(401) when password is wrong', async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash('CorrectPassword1', 1);
      mockFindByEmailWithPassword.mockResolvedValue({
        _id: { toString: () => 'user-id-123' },
        email: loginDto.email,
        password: hashedPassword,
        role: 'user',
      } as any);

      // Act & Assert
      await expect(authService.login(loginDto)).rejects.toMatchObject({
        statusCode: 401,
      });
      await expect(authService.login(loginDto)).rejects.toThrow(
        'Credenciales inválidas'
      );
    });

    it('should store hashed refresh token in database', async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash(loginDto.password, 1);
      mockFindByEmailWithPassword.mockResolvedValue({
        _id: { toString: () => 'user-id-123' },
        email: loginDto.email,
        password: hashedPassword,
        role: 'user',
      } as any);
      mockUpdateRefreshToken.mockResolvedValue(undefined);

      // Act
      await authService.login(loginDto);

      // Assert
      expect(mockUpdateRefreshToken).toHaveBeenCalledTimes(1);
      const storedHash = mockUpdateRefreshToken.mock.calls[0][1];
      expect(storedHash).not.toBe('mock-refresh-token');
      expect(storedHash).toMatch(/^\$2[aby]?\$/);
    });
  });

  // ─────────────────────────────────────────────
  // getMe()
  // ─────────────────────────────────────────────

  describe('getMe', () => {
    it('should return user data when user exists', async () => {
      // Arrange
      const mockUser = {
        _id: { toString: () => 'user-id-123' },
        email: 'alice@test.com',
        name: 'Alice',
        role: 'user',
      };
      mockFindById.mockResolvedValue(mockUser as any);

      // Act
      const result = await authService.getMe('user-id-123');

      // Assert
      expect(mockFindById).toHaveBeenCalledWith('user-id-123');
      expect(result.email).toBe('alice@test.com');
    });

    it('should throw AppError(404) when user does not exist', async () => {
      // Arrange
      mockFindById.mockResolvedValue(null);

      // Act & Assert
      await expect(authService.getMe('nonexistent-id')).rejects.toMatchObject({
        statusCode: 404,
      });
      await expect(authService.getMe('nonexistent-id')).rejects.toThrow(
        'Usuario no encontrado'
      );
    });
  });

  // ─────────────────────────────────────────────
  // logout()
  // ─────────────────────────────────────────────

  describe('logout', () => {
    it('should clear refresh token from database', async () => {
      // Arrange
      mockUpdateRefreshToken.mockResolvedValue(undefined);

      // Act
      await authService.logout('user-id-123');

      // Assert
      expect(mockUpdateRefreshToken).toHaveBeenCalledWith('user-id-123', undefined);
    });
  });
});
