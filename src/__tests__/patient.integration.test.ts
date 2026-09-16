import request from 'supertest';
import mongoose from 'mongoose';

// ============================================
// INTEGRATION TESTS — Patient Routes
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 09: Testing con Supertest + MongoDB Memory Server
// ============================================

import { app } from '../app';
import { connectTestDB, clearTestDB, disconnectTestDB } from './setup';

// Variables para guardar datos entre tests
let userCookies: string[];
let adminCookies: string[];

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
  userCookies = [];
  adminCookies = [];
});

afterAll(async () => {
  await disconnectTestDB();
});

// Helper para extraer cookies de la respuesta
function extractCookies(res: request.Response): string[] {
  const setCookies = res.headers['set-cookie'];
  if (!setCookies) return [];
  const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
  return cookieArray.map((cookie: string) => cookie.split(';')[0]);
}

// Helper para registrar un usuario y obtener cookies
async function registerAndLogin(
  userData: { name: string; email: string; password: string }
): Promise<string[]> {
  await request(app)
    .post('/api/v1/auth/register')
    .send(userData);

  const loginRes = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: userData.email, password: userData.password });

  return extractCookies(loginRes);
}

describe('Patient Routes — Integration Tests', () => {
  // ─────────────────────────────────────────────
  // GET /api/v1/patients
  // ─────────────────────────────────────────────

  describe('GET /api/v1/patients', () => {
    it('should return 200 with empty array initially', async () => {
      // Arrange
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });

      // Act
      const res = await request(app)
        .get('/api/v1/patients')
        .set('Cookie', userCookies);

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    it('should return 401 without authentication', async () => {
      const res = await request(app).get('/api/v1/patients');

      expect(res.status).toBe(401);
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/v1/patients
  // ─────────────────────────────────────────────

  describe('POST /api/v1/patients', () => {
    const patientData = {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@test.com',
      phone: '12345678',
      dateOfBirth: '1990-01-01',
      diagnosis: 'Lumbalgia crónica',
      emergencyContact: 'María Pérez',
      emergencyPhone: '87654321',
      active: true,
    };

    beforeEach(async () => {
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });
    });

    it('should return 201 and create patient with valid data', async () => {
      const res = await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send(patientData);

      expect(res.status).toBe(201);
      expect(res.body.firstName).toBe('Juan');
      expect(res.body.lastName).toBe('Pérez');
      expect(res.body.email).toBe('juan@test.com');
    });

    it('should return 401 without authentication', async () => {
      const res = await request(app)
        .post('/api/v1/patients')
        .send(patientData);

      expect(res.status).toBe(401);
    });

    it('should return 409 when email already exists', async () => {
      await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send(patientData);

      const res = await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send(patientData);

      expect(res.status).toBe(409);
    });

    it('should return 422 on invalid data', async () => {
      const res = await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send({
          firstName: 'J',
          email: 'not-an-email',
          phone: '123',
        });

      expect(res.status).toBe(422);
    });
  });

  // ─────────────────────────────────────────────
  // GET /api/v1/patients/:id
  // ─────────────────────────────────────────────

  describe('GET /api/v1/patients/:id', () => {
    it('should return 200 with patient data', async () => {
      // Arrange
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });

      const createRes = await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send({
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@test.com',
          phone: '12345678',
          dateOfBirth: '1990-01-01',
          diagnosis: 'Lumbalgia crónica',
          emergencyContact: 'María Pérez',
          emergencyPhone: '87654321',
          active: true,
        });

      const patientId = createRes.body._id;

      // Act
      const res = await request(app)
        .get(`/api/v1/patients/${patientId}`)
        .set('Cookie', userCookies);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Juan');
      expect(res.body.email).toBe('juan@test.com');
    });

    it('should return 404 with non-existent ID', async () => {
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });

      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .get(`/api/v1/patients/${fakeId}`)
        .set('Cookie', userCookies);

      expect(res.status).toBe(404);
    });
  });

  // ─────────────────────────────────────────────
  // PATCH /api/v1/patients/:id
  // ─────────────────────────────────────────────

  describe('PATCH /api/v1/patients/:id', () => {
    it('should return 200 and update patient', async () => {
      // Arrange
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });

      const createRes = await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send({
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@test.com',
          phone: '12345678',
          dateOfBirth: '1990-01-01',
          diagnosis: 'Lumbalgia crónica',
          emergencyContact: 'María Pérez',
          emergencyPhone: '87654321',
          active: true,
        });

      const patientId = createRes.body._id;

      // Act
      const res = await request(app)
        .patch(`/api/v1/patients/${patientId}`)
        .set('Cookie', userCookies)
        .send({ firstName: 'Juan Carlos' });

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Juan Carlos');
    });

    it('should return 404 with non-existent ID', async () => {
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });

      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .patch(`/api/v1/patients/${fakeId}`)
        .set('Cookie', userCookies)
        .send({ firstName: 'Test' });

      expect(res.status).toBe(404);
    });
  });

  // ─────────────────────────────────────────────
  // DELETE /api/v1/patients/:id
  // ─────────────────────────────────────────────

  describe('DELETE /api/v1/patients/:id', () => {
    it('should return 204 when admin deletes patient', async () => {
      // Arrange
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });

      const createRes = await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send({
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@test.com',
          phone: '12345678',
          dateOfBirth: '1990-01-01',
          diagnosis: 'Lumbalgia crónica',
          emergencyContact: 'María Pérez',
          emergencyPhone: '87654321',
          active: true,
        });

      const patientId = createRes.body._id;

      // Crear admin
      const adminData = {
        name: 'Admin',
        email: 'admin@test.com',
        password: 'Password1!',
      };
      await request(app)
        .post('/api/v1/auth/register')
        .send(adminData);

      // Actualizar rol a admin directamente en MongoDB
      const { UserModel } = await import('../models/user.model');
      await UserModel.findOneAndUpdate(
        { email: 'admin@test.com' },
        { role: 'admin' }
      );

      adminCookies = await registerAndLogin(adminData);

      // Act
      const res = await request(app)
        .delete(`/api/v1/patients/${patientId}`)
        .set('Cookie', adminCookies);

      // Assert
      expect(res.status).toBe(204);
    });

    it('should return 403 when regular user tries to delete', async () => {
      // Arrange
      userCookies = await registerAndLogin({
        name: 'Alice',
        email: 'alice@test.com',
        password: 'Password1!',
      });

      const createRes = await request(app)
        .post('/api/v1/patients')
        .set('Cookie', userCookies)
        .send({
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@test.com',
          phone: '12345678',
          dateOfBirth: '1990-01-01',
          diagnosis: 'Lumbalgia crónica',
          emergencyContact: 'María Pérez',
          emergencyPhone: '87654321',
          active: true,
        });

      const patientId = createRes.body._id;

      // Act
      const res = await request(app)
        .delete(`/api/v1/patients/${patientId}`)
        .set('Cookie', userCookies);

      // Assert
      expect(res.status).toBe(403);
    });

    it('should return 401 without authentication', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).delete(`/api/v1/patients/${fakeId}`);

      expect(res.status).toBe(401);
    });
  });
});
