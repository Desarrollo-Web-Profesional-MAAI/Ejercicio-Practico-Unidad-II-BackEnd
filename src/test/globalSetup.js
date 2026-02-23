// <reference types="jest" />
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * Configuración global para las pruebas utilizando Jest y MongoDB Memory Server.
 */
export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '6.0.4',
    },
  });
  
  global.__MONGOINSTANCE = instance;
  process.env.DATABASE_URL = instance.getUri();
}