"use server"

import prisma from '@/lib/prisma'

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const orderUpdated = await prisma.order.update({
      where: { id:  orderId },
      data: { transactionId },
    })

    if (!orderUpdated) {
      return {
        ok: false,
        message: `No se encontró el pedido con el id #${orderId}`
      }
    }

    return {
      ok: true,
      order: orderUpdated,
      message: 'Orden creada correctamente'
    }
  } catch (error ) {
    console.log(error)
    return {
      ok: false,
      message: 'Hubo un error al procesar el pago'
    }
  }
}