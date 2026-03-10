import mongoose, { Schema } from 'mongoose'

/**
 * Esquema de usuario para autenticación
 * @typedef {Object} Usuario
 * @property {string} username - Nombre de usuario único
 * @property {string} password - Contraseña encriptada
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      trim: true,
      minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const Usuario = mongoose.model('usuario', userSchema)