import mongoose, { Schema } from 'mongoose'

const pedidoSchema = new Schema(
  {
    // NUEVO: Referencia al usuario que hizo el pedido
    cliente: {
      type: Schema.Types.ObjectId,
      ref: 'usuario',
      required: false, // Opcional por ahora para no romper pedidos existentes
    },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true, length: 10 },
    direccion: { type: String, required: true },
    fecha_solicitud: { type: Date, required: true },
    fecha_envio: { type: Date, required: true },
    total: { type: Number, default: 0.0 },
    pagado: [String],
    comentario: { type: String },
  },
  { timestamps: true },
)

export const Pedido = mongoose.model('Pedido', pedidoSchema)