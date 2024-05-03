"use server"

import { auth } from '@/auth'
import { AUTH_CONSTANTS, Role } from '@/features/auth'
import { PaginationOptions } from '@/features/shared'
import prisma from '@/lib/prisma'

export const adminGetUsers = async ({ currentPage = 1, take = 12 }: PaginationOptions) => {

  if (isNaN(Number(currentPage))) currentPage = 1
  if (currentPage < 1) currentPage = 1
  if (isNaN(Number(take))) take = 12
  const validRoles = [AUTH_CONSTANTS.ROLES.ADMIN]
  const session = await auth()

  if (!validRoles.includes(session?.user.role as Role)) return {
    ok: false,
    message: 'Usuario no autorizado',
    users: [],
    currentPage: 1,
    totalPages: 1
  }

  try {
    const users = await prisma.user.findMany({
      take,
      skip: (currentPage - 1) * take,
      orderBy: {
        createdAt: 'desc',
      }
    })

    // Obtener el total de páginas
    const totalUsers = await prisma.user.count()
    const totalPages = Math.ceil(totalUsers / take)

    return {
      ok: true,
      users,
      currentPage,
      totalPages,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener los usuarios',
      users: [],
      currentPage: 1,
      totalPages: 1
    }
  }
}