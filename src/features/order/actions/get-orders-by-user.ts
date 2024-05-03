"use server"

import { auth } from '@/auth'
import prisma from '@/lib/prisma'

interface PaginationOptions {
  id?: string
  currentPage?: number
  take?: number
}

export const getOrdersByUser = async ({ currentPage = 1, take = 12, id }: PaginationOptions) => {

  if (isNaN(Number(currentPage))) currentPage = 1
  if (currentPage < 1) currentPage = 1
  if (isNaN(Number(take))) take = 12
  
  const session = await auth()
  const userId = id || session?.user?.id

  if (!session?.user) return {
    ok: false,
    message: 'Usuario no autenticado',
    orders: [],
    currentPage: 1,
    totalPages: 1
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      take,
      skip: (currentPage - 1) * take,
      include: {
        orderAddress: {
          select: {
            firstName: true,
            lastName: true,
            address: true,
            district: true,
          }
        },
        // orderItems: {
        //   select: {
        //     price: true,
        //     quantity: true,
        //     size: true,
        //     product: {
        //       select: {
        //         title: true,
        //         slug: true,
        //         images: {
        //           select: {
        //             url: true
        //           },
        //           take: 1,
        //         }
        //       },
        //     },
        //   }
        // },
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    // Obtener el total de páginas
    const totalOrders = await prisma.order.count({
      where: { userId },
    })
    const totalPages = Math.ceil(totalOrders / take)

    return {
      ok: true,
      orders,
      currentPage,
      totalPages,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener los pedidos',
      orders: [],
      currentPage: 1,
      totalPages: 1
    }
  }
}