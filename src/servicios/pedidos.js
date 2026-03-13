// servicios/pedidos.js
import { Pedido } from "../bd/modelos/pedido.js";

/**
 * Función para crear un nuevo pedido en la base de datos.
 */
export async function creaPedido({
  nombre,
  telefono,
  direccion,
  fecha_solicitud,
  fecha_envio,
  total,
  pagado,
  abono,
  comentario,
}) {

  const pedido = new Pedido({
    nombre,
    telefono,
    direccion,
    fecha_solicitud,
    fecha_envio,
    total,
    pagado,
    abono,
    comentario,
  });

  return await pedido.save();
}

/**
 * Función para obtener una lista de pedidos
 */
export async function listaPedidos(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {}
) {
  return await Pedido.find(query).sort({ [sortBy]: sortOrder });
}

/**
 * Lista todos los pedidos
 */
export async function listaAllPedidos(opciones) {
  return await listaPedidos({}, opciones);
}

/**
 * Buscar pedidos por nombre
 */
export async function listaPedidosByNombre(nombre, opciones) {
  return await listaPedidos({ nombre }, opciones);
}

/**
 * Buscar pedidos por método de pago
 */
export async function listPedidosByPagado(pagado, opciones) {
  return await listaPedidos({ pagado }, opciones);
}

/**
 * Obtener pedido por ID
 */
export async function getPedidoById(pedidoId) {
  return await Pedido.findById(pedidoId);
}

/**
 * Modificar pedido
 */
export async function modificaPedido(
  pedidoId,
  {
    nombre,
    telefono,
    direccion, // ✅ AGREGADO
    fecha_solicitud,
    fecha_envio,
    total,
    pagado,
    abono,
    comentario,
  }
) {
  return await Pedido.findOneAndUpdate(
    { _id: pedidoId },
    {
      $set: {
        nombre,
        telefono,
        direccion, // ✅ AGREGADO
        fecha_solicitud,
        fecha_envio,
        total,
        pagado,
        abono,
        comentario,
      },
    },
    { new: true }
  );
}

/**
 * Eliminar pedido
 */
export async function eliminaPedido(pedidoId) {
  return await Pedido.deleteOne({ _id: pedidoId });
}