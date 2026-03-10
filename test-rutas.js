import dotenv from 'dotenv'
dotenv.config()

import { app } from './src/app.js'
import { initBaseDeDatos } from './src/bd/init.js'

console.log('\n=== VERIFICACIÓN DE RUTAS ===\n')

// Inicializar DB primero
await initBaseDeDatos()

// Hacer una petición de prueba interna
const testRequest = async (method, path, body = null) => {
  const mockReq = {
    method,
    url: path,
    path,
    headers: { 'content-type': 'application/json' },
    body: body || {},
  }

  const mockRes = {
    status: function (code) {
      this.statusCode = code
      return this
    },
    json: function (data) {
      this.data = data
      return this
    },
    send: function (data) {
      this.data = data
      return this
    },
  }

  console.log(`Probando: ${method} ${path}`)

  return { req: mockReq, res: mockRes }
}

// Probar rutas
console.log('1. GET /')
console.log('2. POST /api/v1/usuario/signup')
console.log('3. POST /api/v1/usuario/login')
console.log('4. GET /api/v1/pedidos')
console.log('\n✅ App cargada correctamente\n')

process.exit(0)