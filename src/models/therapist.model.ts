// ============================================
// MODELO: Therapist (entidad secundaria)
// Centro de Rehabilitación Física
// ============================================

import { Schema, model } from 'mongoose';

export interface ITherapist {
  name: string;
  specialty: string;
  email: string;
  phone?: string;
  active?: boolean;
}

const therapistSchema = new Schema<ITherapist>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: 100,
    },
    specialty: {
      type: String,
      required: [true, 'La especialidad es requerida'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Therapist = model<ITherapist>('Therapist', therapistSchema);
