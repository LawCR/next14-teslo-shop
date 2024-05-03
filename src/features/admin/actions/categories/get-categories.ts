"use server"

import { PaginationOptions } from '@/features/shared'
import prisma from '@/lib/prisma'

export const getCategories = async ({ currentPage = 1, take = 12 }: PaginationOptions) => {

  if (isNaN(Number(currentPage))) currentPage = 1
  if (currentPage < 1) currentPage = 1
  if (isNaN(Number(take))) take = 12
  
  try {
    const categories = await prisma.category.findMany({
      take,
      skip: (currentPage - 1) * take,
      orderBy: {
        name: 'asc',
      }
    })

    // Obtener el total de páginas
    const totalCategories = await prisma.category.count()
    const totalPages = Math.ceil(totalCategories / take)

    return {
      ok: true,
      categories,
      currentPage,
      totalPages,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener las categorías',
      categories: [],
      currentPage: 1,
      totalPages: 1
    }
  }
}