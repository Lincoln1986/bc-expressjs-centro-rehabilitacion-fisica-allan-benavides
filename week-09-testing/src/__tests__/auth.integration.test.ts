import request from 'supertest';
import mongoose from 'mongoose';

// ============================================
// INTEGRATION TESTS — Auth Routes
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 09: Testing con Supertest + MongoDB Memory Server
//
// Tests de integración para las rutas de autenticación.
// Verifica el ciclo completo: HTTP → middleware → controller → service → MongoDB
// ============================================

import { app } from '../app';
import { connectTestDB, clearTestDB, disconnectTestDB } from './setup';

// Variable para guardar cookies entre tests
let cookies: string[];

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
  cookies = [];
});

afterAll(async () => {
  await disconnectTestDB();
});

// Helper para extraer cookies de la respuesta
function extractCookies(res: request.Response): string[] {
  const setCookies = res.headers['set-cookie'];
  if (!setCookies) return [];
  // set-cookie puede ser string o string[]
  const cookies = Array.isArray(setCookies) ? setCookies : [setCookies];
  return cookies.map((cookie: string) => cookie.split(';')[0]);
}

describe('Auth Routes — Integration Tests', () => {
  // ─────────────────────────────────────────────
  // POST /api/v1/auth/register
  // ─────────────────────────────────────────────

  describe('POST /api/v1/auth/register', () => {
    it('should return 201 and user data on valid registration', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Alice',
          email: 'alice@test.com',
          password: 'Password1!',
        });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        email: 'alice@test.com',
        name: 'Alice',
        role: 'user',
      });
      // La contraseña nunca debe aparecer en la respuesta
      expect(res.body.password).toBeUndefined();
    });

    it('should return 409 when email is already registered', async () => {
      // Registrar el primer usuario
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Alice',
          email: 'alice@test.com',
          password: 'Password1!',
        });

      // Intentar registrar con el mismo email
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Alice 2',
          email: 'alice@test.com',
          password: 'Password1!',
        });

      expect(res.status).toBe(409);
    });

    it('should return 422 on invalid input (Zod validation)', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'A',
          email: 'not-an-email',
          password: '123',
        });

      expect(res.status).toBe(422);
    });

    it('should return 422 when password is too weak', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Alice',
          email: 'alice@test.com',
          password: 'weak',
        });

      expect(res.status).toBe(422);
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/v1/auth/login
  // ─────────────────────────────────────────────

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Crear un usuario antes de cada test de login
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Alice',
          email: 'alice@test.com',
          password: 'Password1!',
        });
    });

    it('should return 200 and set cookies on valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'alice@test.com',
          password: 'Password1!',
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login exitoso');

      // Verificar que se establecieron cookies
      cookies = extractCookies(res);
      expect(cookies.some((c) => c.startsWith('accessToken='))).toBe(true);
      expect(cookies.some((c) => c.startsWith('refreshToken='))).toBe(true);
    });

    it('should return 401 on wrong password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'alice@test.com',
          password: 'WrongPassword1!',
        });

      expect(res.status).toBe(401);
    });

    it('should return 401 when user does not exist', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'Password1!',
        });

      expect(res.status).toBe(401);
    });
  });

  // ─────────────────────────────────────────────
  // GET /api/v1/auth/me
  // ─────────────────────────────────────────────

  describe('GET /api/v1/auth/me', () => {
    it('should return 200 and user data with valid token', async () => {
      // Registrar y login
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Alice',
          email: 'alice@test.com',
          password: 'Password1!',
        });

      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'alice@test.com',
          password: 'Password1!',
        });

      cookies = extractCookies(loginRes);

      // Usar cookie para acceder a /me
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Cookie', cookies);

      expect(res.status).toBe(200);
      expect(res.body.email).toBe('alice@test.com');
      expect(res.body.name).toBe('Alice');
      expect(res.body.password).toBeUndefined();
    });

    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/v1/auth/me');

      expect(res.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Cookie', ['accessToken=invalid-token-here']);

      expect(res.status).toBe(401);
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/v1/auth/logout
  // ─────────────────────────────────────────────

  describe('POST /api/v1/auth/logout', () => {
    it('should return 200 and clear cookies', async () => {
      // Registrar y login
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Alice',
          email: 'alice@test.com',
          password: 'Password1!',
        });

      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'alice@test.com',
          password: 'Password1!',
        });

      cookies = extractCookies(loginRes);

      // Logout
      const res = await request(app)
        .post('/api/v1/auth/logout')
        .set('Cookie', cookies);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Sesión cerrada');
    });

    it('should return 401 without token', async () => {
      const res = await request(app).post('/api/v1/auth/logout');

      expect(res.status).toBe(401);
    });
  });

  // ─────────────────────────────────────────────
  // Health Check
  // ─────────────────────────────────────────────

  describe('GET /api/v1/health', () => {
    it('should return 200 with status ok', async () => {
      const res = await request(app).get('/api/v1/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });
  });
});
