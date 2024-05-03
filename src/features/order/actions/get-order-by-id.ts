"use server"

import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'

// interface OrderByIdResponse {
//   ok: boolean;
//   order?: Order;
//   message?: string;
// }

export const getOrderById = async (id: string)=> {

  const session = await auth()
  if (!session?.user) return {
    ok: false,
    message: 'Usuario no autenticado'
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderAddress: true,
        orderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                images: {
                  select: {
                    url: true
                  },
                  take: 1,
                }
              },
            },
          }
        },
      }
    })
  
    if (!order) notFound()

    if (session.user.role === 'client') {
      if (session.user.id !== order.userId) {
        throw `No tienes permisos para ver este pedido`
      }
    }
  
    return {
      ok: true,
      order
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener el pedido'
    }
  }

}
