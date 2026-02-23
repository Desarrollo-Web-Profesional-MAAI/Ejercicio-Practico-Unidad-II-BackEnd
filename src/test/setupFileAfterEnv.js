import mongoose from 'mongoose';
import { beforeAll, afterAll } from '@jest/globals';
import { initBaseDeDatos } from '../bd/init.js';

/**
 * Archivo de configuración para Jest que se ejecuta después de configurar el entorno de pruebas.
 */
beforeAll(async () => {
  await initBaseDeDatos();
});

/**
 * Después de que todas las pruebas hayan finalizado, se desconecta de la base de datos.
 */
afterAll(async () => {
  await mongoose.disconnect();
});