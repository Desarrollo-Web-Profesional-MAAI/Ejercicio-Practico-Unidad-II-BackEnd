import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Usuario } from '../bd/modelos/usuario.js'

/**
 * Crear un nuevo usuario con contraseña encriptada
 * @param {Object} param0 - Datos del usuario
 * @param {string} param0.username - Nombre de usuario
 * @param {string} param0.password - Contraseña en texto plano
 * @returns {Promise<Usuario>} Usuario creado
 */
export async function createUsuario({ username, password }) {
  try {
    // Encriptar contraseña con bcrypt (10 rondas de salt)
    const hashedPassword = await bcrypt.hash(password, 10)

    const usuario = new Usuario({
      username,
      password: hashedPassword,
    })

    return await usuario.save()
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('El nombre de usuario ya existe')
    }
    throw new Error(`Error al crear usuario: ${error.message}`)
  }
}

/**
 * Autenticar usuario y generar token JWT
 * @param {Object} param0 - Credenciales
 * @param {string} param0.username - Nombre de usuario
 * @param {string} param0.password - Contraseña
 * @returns {Promise<string>} Token JWT
 */
export async function loginUsuario({ username, password }) {
  // Buscar usuario por nombre de usuario
  const usuario = await Usuario.findOne({ username })

  if (!usuario) {
    throw new Error('Nombre de Usuario Incorrecto!')
  }

  // Comparar contraseña ingresada con la encriptada
  const isPasswordCorrect = await bcrypt.compare(password, usuario.password)

  if (!isPasswordCorrect) {
    throw new Error('Contraseña inválida!')
  }

  // Generar token JWT válido por 24 horas
  const token = jwt.sign(
    { sub: usuario._id, username: usuario.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    },
  )

  return token
}

/**
 * Obtener información del usuario por ID
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} Información del usuario
 */
export async function getUsuarioInfoById(userId) {
  try {
    const usuario = await Usuario.findById(userId).select('-password')

    if (!usuario) {
      return { username: userId }
    }

    return {
      _id: usuario._id,
      username: usuario.username,
      createdAt: usuario.createdAt,
    }
  } catch (err) {
    return { username: userId }
  }
}

/**
 * Verificar y decodificar token JWT
 * @param {string} token - Token JWT
 * @returns {Promise<Object>} Datos decodificados del token
 */
export async function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new Error('Token inválido o expirado')
  }
}