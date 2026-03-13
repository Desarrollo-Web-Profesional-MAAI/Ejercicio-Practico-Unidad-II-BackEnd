import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { pedidosRoutes } from './rutas/pedidos.js'
import { usuarioRoutes } from './rutas/usuario.js'

const app = express()

// ============================================
// MIDDLEWARES
// ============================================

// Configurar CORS para permitir frontend local y en Railway
const corsOptions = {
  origin: [
    'http://localhost:5173', // Frontend local (desarrollo)
    'http://localhost:5174',
    'https://ejercicio-practico-unidad-ii-frontend-production.up.railway.app',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ============================================
// LOGGING TEMPORAL - Para debugging (opcional, puedes quitarlo en producción)
// ============================================
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/api/v1/pedidos') {
      console.log('\n📦 === PETICIÓN POST A /api/v1/pedidos ===')
      console.log('Body completo:', JSON.stringify(req.body, null, 2))
      console.log('Campos recibidos:', Object.keys(req.body))
      console.log('nombre:', req.body.nombre)
      console.log('telefono:', req.body.telefono)
      console.log('direccion:', req.body.direccion)
      console.log('fecha_solicitud:', req.body.fecha_solicitud)
      console.log('fecha_envio:', req.body.fecha_envio)
      console.log('total:', req.body.total)
      console.log('pagado:', req.body.pagado)
      console.log('comentario:', req.body.comentario)
      console.log('========================================\n')
    }
    next()
  })
}

// ============================================
// REGISTRAR RUTAS
// ============================================
usuarioRoutes(app)
pedidosRoutes(app)

// ============================================
// RUTA PRINCIPAL
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API REST - Pedidos con Autenticación JWT',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      pedidos: '/api/v1/pedidos',
      usuarios: '/api/v1/usuarios',
      signup: '/api/v1/usuario/signup',
      login: '/api/v1/usuario/login',
      health: '/health',
    },
  })
})

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// ============================================
// MANEJO DE ERRORES 404 (DEBE IR AL FINAL)
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method,
  })
})

export { app }