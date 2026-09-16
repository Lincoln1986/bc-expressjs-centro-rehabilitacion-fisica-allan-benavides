// ============================================
// UNIT TESTS — patient.service.ts
// ============================================
// Dominio: Centro de Rehabilitación Física
// Semana 09: Testing con Jest
//
// Tests unitarios del servicio de pacientes.
// Mockeamos el repositorio de pacientes para aislar la lógica de negocio.
// ============================================

// IMPORTANTE: jest.mock() debe ir ANTES de los imports que lo usan
jest.mock('../repositories/patient.repository');

import * as patientRepo from '../repositories/patient.repository';
import * as patientService from '../services/patient.service';
import { AppError } from '../errors/AppError';

// Cast para que TypeScript reconozca los métodos mock
const mockFindAll = patientRepo.findAll as jest.MockedFunction<
  typeof patientRepo.findAll
>;
const mockFindById = patientRepo.findById as jest.MockedFunction<
  typeof patientRepo.findById
>;
const mockFindByEmail = patientRepo.findByEmail as jest.MockedFunction<
  typeof patientRepo.findByEmail
>;
const mockCreate = patientRepo.create as jest.MockedFunction<
  typeof patientRepo.create
>;
const mockUpdateById = patientRepo.updateById as jest.MockedFunction<
  typeof patientRepo.updateById
>;
const mockDeleteById = patientRepo.deleteById as jest.MockedFunction<
  typeof patientRepo.deleteById
>;

// Helper para crear un paciente mock
function createMockPatient(overrides = {}) {
  return {
    _id: { toString: () => 'patient-id-123' },
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@test.com',
    phone: '12345678',
    dateOfBirth: new Date('1990-01-01'),
    diagnosis: 'Lumbalgia crónica',
    emergencyContact: 'María Pérez',
    emergencyPhone: '87654321',
    active: true,
    registeredBy: { toString: () => 'user-id-123' },
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

describe('PatientService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ─────────────────────────────────────────────
  // getAll()
  // ─────────────────────────────────────────────

  describe('getAll', () => {
    it('should return all patients', async () => {
      // Arrange
      const mockPatients = [createMockPatient(), createMockPatient({ email: 'maria@test.com' })];
      mockFindAll.mockResolvedValue(mockPatients as any);

      // Act
      const result = await patientService.getAll();

      // Assert
      expect(mockFindAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0].firstName).toBe('Juan');
    });

    it('should return empty array when no patients exist', async () => {
      // Arrange
      mockFindAll.mockResolvedValue([]);

      // Act
      const result = await patientService.getAll();

      // Assert
      expect(result).toHaveLength(0);
    });
  });

  // ─────────────────────────────────────────────
  // getById()
  // ─────────────────────────────────────────────

  describe('getById', () => {
    it('should return patient by id', async () => {
      // Arrange
      const mockPatient = createMockPatient();
      mockFindById.mockResolvedValue(mockPatient as any);

      // Act
      const result = await patientService.getById('patient-id-123');

      // Assert
      expect(mockFindById).toHaveBeenCalledWith('patient-id-123');
      expect(result.firstName).toBe('Juan');
    });

    it('should throw AppError(404) when patient does not exist', async () => {
      // Arrange
      mockFindById.mockResolvedValue(null);

      // Act & Assert
      await expect(patientService.getById('nonexistent-id')).rejects.toMatchObject({
        statusCode: 404,
      });
      await expect(patientService.getById('nonexistent-id')).rejects.toThrow(
        'Paciente no encontrado'
      );
    });
  });

  // ─────────────────────────────────────────────
  // create()
  // ─────────────────────────────────────────────

  describe('create', () => {
    const createDto = {
      firstName: 'Carlos',
      lastName: 'García',
      email: 'carlos@test.com',
      phone: '11223344',
      dateOfBirth: new Date('1985-05-15'),
      diagnosis: 'Fractura de muñeca',
      emergencyContact: 'Ana García',
      emergencyPhone: '44332211',
      active: true,
    };

    it('should create a patient with valid data', async () => {
      // Arrange
      mockFindByEmail.mockResolvedValue(null);
      const createdPatient = createMockPatient({ ...createDto, _id: { toString: () => 'new-id' } });
      mockCreate.mockResolvedValue(createdPatient as any);

      // Act
      const result = await patientService.create(createDto, 'user-id-123');

      // Assert
      expect(mockFindByEmail).toHaveBeenCalledWith(createDto.email);
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(result.email).toBe(createDto.email);
    });

    it('should throw AppError(409) when email already exists', async () => {
      // Arrange — fingir que el email ya existe
      mockFindByEmail.mockResolvedValue(createMockPatient({ email: createDto.email }) as any);

      // Act & Assert
      await expect(patientService.create(createDto, 'user-id-123')).rejects.toMatchObject({
        statusCode: 409,
      });
      await expect(patientService.create(createDto, 'user-id-123')).rejects.toThrow(
        'Ya existe un paciente con este email'
      );
    });
  });

  // ─────────────────────────────────────────────
  // update()
  // ─────────────────────────────────────────────

  describe('update', () => {
    it('should update patient with valid data', async () => {
      // Arrange
      const mockPatient = createMockPatient();
      mockFindById.mockResolvedValue(mockPatient as any);
      const updatedPatient = createMockPatient({ firstName: 'Juan Carlos' });
      mockUpdateById.mockResolvedValue(updatedPatient as any);

      // Act
      const result = await patientService.update('patient-id-123', { firstName: 'Juan Carlos' });

      // Assert
      expect(mockFindById).toHaveBeenCalledWith('patient-id-123');
      expect(mockUpdateById).toHaveBeenCalledWith('patient-id-123', { firstName: 'Juan Carlos' });
      expect(result.firstName).toBe('Juan Carlos');
    });

    it('should throw AppError(404) when patient does not exist', async () => {
      // Arrange
      mockFindById.mockResolvedValue(null);

      // Act & Assert
      await expect(
        patientService.update('nonexistent-id', { firstName: 'Test' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it('should throw AppError(404) when update returns null', async () => {
      // Arrange — patient exists but update fails
      const mockPatient = createMockPatient();
      mockFindById.mockResolvedValue(mockPatient as any);
      mockUpdateById.mockResolvedValue(null);

      // Act & Assert
      await expect(
        patientService.update('patient-id-123', { firstName: 'Test' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // ─────────────────────────────────────────────
  // remove()
  // ─────────────────────────────────────────────

  describe('remove', () => {
    it('should delete patient successfully', async () => {
      // Arrange
      mockDeleteById.mockResolvedValue(true);

      // Act
      await patientService.remove('patient-id-123');

      // Assert
      expect(mockDeleteById).toHaveBeenCalledWith('patient-id-123');
    });

    it('should throw AppError(404) when patient does not exist', async () => {
      // Arrange
      mockDeleteById.mockResolvedValue(false);

      // Act & Assert
      await expect(patientService.remove('nonexistent-id')).rejects.toMatchObject({
        statusCode: 404,
      });
      await expect(patientService.remove('nonexistent-id')).rejects.toThrow(
        'Paciente no encontrado'
      );
    });
  });
});
