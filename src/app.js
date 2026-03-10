import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { pedidosRoutes } from './rutas/pedidos.js'
import { usuarioRoutes } from './rutas/usuario.js'

const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// IMPORTANTE: Registrar rutas ANTES de las rutas de error
usuarioRoutes(app)
pedidosRoutes(app)

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API REST - Pedidos con Autenticación JWT',
    version: '2.0.0',
    endpoints: {
      pedidos: '/api/v1/pedidos',
      usuarios: '/api/v1/usuarios',
      signup: '/api/v1/usuario/signup',
      login: '/api/v1/usuario/login',
      health: '/health',
    },
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  })
})

// Manejo de errores 404 (debe ir AL FINAL)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.path,
  })
})

export { app }