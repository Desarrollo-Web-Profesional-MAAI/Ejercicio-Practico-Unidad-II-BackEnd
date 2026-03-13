import mongoose from 'mongoose'

const { Schema, model } = mongoose

const pedidoSchema = new Schema(
  {
    cliente: {
      type: Schema.Types.ObjectId,
      ref: 'usuario',
    },
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      maxlength: [10, 'El teléfono debe tener máximo 10 dígitos'],
    },
    direccion: {
      type: String,
      required: [true, 'La dirección es obligatoria'],
      trim: true,
    },
    fecha_solicitud: {
      type: Date,
      required: [true, 'La fecha de solicitud es obligatoria'],
    },
    fecha_envio: {
      type: Date,
      required: [true, 'La fecha de envío es obligatoria'],
    },
    total: {
      type: Number,
      default: 0.0,
      min: [0, 'El total no puede ser negativo'],
    },
    pagado: {
      type: [String],
      default: [],
    },
    comentario: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const Pedido = model('Pedido', pedidoSchema)