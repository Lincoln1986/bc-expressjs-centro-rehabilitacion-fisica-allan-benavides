import mongoose, { Document, Schema } from 'mongoose';

// ============================================
// MODELO DE PACIENTE
// ============================================
// Dominio: Centro de Rehabilitación Física
// Recurso principal: Pacientes del centro
// ============================================

export interface IPatient extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  diagnosis: string;
  medicalHistory?: string;
  emergencyContact: string;
  emergencyPhone: string;
  active: boolean;
  registeredBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
  {
    firstName: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es requerido'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'La fecha de nacimiento es requerida'],
    },
    diagnosis: {
      type: String,
      required: [true, 'El diagnóstico es requerido'],
      trim: true,
    },
    medicalHistory: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      required: [true, 'El contacto de emergencia es requerido'],
      trim: true,
    },
    emergencyPhone: {
      type: String,
      required: [true, 'El teléfono de emergencia es requerido'],
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    registeredBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const PatientModel = mongoose.model<IPatient>('Patient', patientSchema);
