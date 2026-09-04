import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import patientRouter from './routes/patient.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

// Rutas de pacientes (recurso principal del dominio)
app.use('/api/v1/patients', patientRouter);

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
