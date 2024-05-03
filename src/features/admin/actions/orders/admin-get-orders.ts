"use server"

import { auth } from '@/auth'
import { AUTH_CONSTANTS, Role } from '@/features/auth'
import { PaginationOptions } from '@/features/shared'
import prisma from '@/lib/prisma'

export const adminGetOrders = async ({ currentPage = 1, take = 12 }: PaginationOptions) => {

  if (isNaN(Number(currentPage))) currentPage = 1
  if (currentPage < 1) currentPage = 1
  if (isNaN(Number(take))) take = 12
  const validRoles = [AUTH_CONSTANTS.ROLES.ADMIN, AUTH_CONSTANTS.ROLES.EMPLOYEE]
  
  const session = await auth()

  if (!validRoles.includes(session?.user.role as Role)) return {
    ok: false,
    message: 'Usuario no autorizado',
    orders: [],
    currentPage: 1,
    totalPages: 1
  }

  try {
    const orders = await prisma.order.findMany({
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
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    // Obtener el total de páginas
    const totalOrders = await prisma.order.count()
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