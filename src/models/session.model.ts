// ============================================
// MODELO: Session (entidad principal)
// Centro de Rehabilitación Física
// ============================================

import { Schema, model, Types } from 'mongoose';

export interface ISession {
  patientName: string;
  category: string;
  exercise: string;
  price: number;
  active?: boolean;
  scheduledAt?: Date;
  notes?: string;
  therapist: Types.ObjectId;
}

const sessionSchema = new Schema<ISession>(
  {
    patientName: {
      type: String,
      required: [true, 'El nombre del paciente es requerido'],
      trim: true,
      maxlength: 150,
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
      maxlength: 100,
    },
    exercise: {
      type: String,
      required: [true, 'El ejercicio es requerido'],
      trim: true,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    scheduledAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    therapist: {
      type: Schema.Types.ObjectId,
      ref: 'Therapist',
      required: [true, 'El terapeuta es requerido'],
    },
  },
  { timestamps: true },
);

export const Session = model<ISession>('Session', sessionSchema);
