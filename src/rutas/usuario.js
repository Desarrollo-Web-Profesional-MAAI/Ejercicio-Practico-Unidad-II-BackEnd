import {
  createUsuario,
  loginUsuario,
  getUsuarioInfoById,
} from '../servicios/usuarios.js'

/**
 * Rutas de autenticación de usuarios
 * @param {Express} app - Aplicación Express
 */
export function usuarioRoutes(app) {
  /**
   * POST /api/v1/usuario/signup
   * Registrar nuevo usuario
   */
  app.post('/api/v1/usuario/signup', async (req, res) => {
    try {
      const { username, password } = req.body

      // Validaciones básicas
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username y password son obligatorios',
        })
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'La contraseña debe tener al menos 6 caracteres',
        })
      }

      const usuario = await createUsuario({ username, password })

      return res.status(201).json({
        success: true,
        data: {
          username: usuario.username,
          _id: usuario._id,
        },
        message: 'Usuario creado exitosamente',
      })
    } catch (err) {
      console.error('Error en signup:', err)
      return res.status(400).json({
        success: false,
        error:
          err.message || 'Falló al crear el usuario. ¿El usuario ya existe?',
      })
    }
  })

  /**
   * POST /api/v1/usuario/login
   * Iniciar sesión y obtener token JWT
   */
  app.post('/api/v1/usuario/login', async (req, res) => {
    try {
      const { username, password } = req.body

      // Validaciones básicas
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username y password son obligatorios',
        })
      }

      const token = await loginUsuario({ username, password })

      return res.status(200).json({
        success: true,
        data: { token },
        message: 'Login exitoso',
      })
    } catch (err) {
      console.error('Error en login:', err)
      return res.status(400).json({
        success: false,
        error:
          err.message ||
          'Login falló. ¿Ingresaste el Usuario/Contraseña correcta?',
      })
    }
  })

  /**
   * GET /api/v1/usuarios/:id
   * Obtener información de un usuario por ID
   */
  app.get('/api/v1/usuarios/:id', async (req, res) => {
    try {
      const userInfo = await getUsuarioInfoById(req.params.id)

      return res.status(200).json({
        success: true,
        data: userInfo,
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Error al obtener información del usuario',
      })
    }
  })
}