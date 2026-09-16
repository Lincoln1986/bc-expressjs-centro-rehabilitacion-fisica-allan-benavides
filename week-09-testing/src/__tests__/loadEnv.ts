import dotenv from 'dotenv';
import path from 'path';

// Cargar .env.test para tests
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });
