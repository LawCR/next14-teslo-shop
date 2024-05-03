"use server"

import { Gender } from "@/features/product/interfaces"
import prisma from "@/lib/prisma"

interface PaginationOptions {
  currentPage?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({ currentPage = 1, take = 12, gender }: PaginationOptions) => {

  if (isNaN(Number(currentPage))) currentPage = 1
  if (currentPage < 1) currentPage = 1
  if (isNaN(Number(take))) take = 12

  try {
    // Obtener productos con imagenes
    const products = await prisma.product.findMany({
      take,
      skip: (currentPage - 1) * take,
      include: {
        images: {
          take: 2, // Tomamos solo las dos primeras imagenes
          select: {
            url: true,
          },
        },
      },
      where: {
        gender
      }
    })

    // Obtener el total de páginas
    const totalProducts = await prisma.product.count({
      where: {
        gender
      }
    })
    const totalPages = Math.ceil(totalProducts / take)

    return {
      currentPage,
      totalPages,
      products: products.map(product => ({
        ...product,
        images: product.images.map(image => image.url)
      }))
    }
  } catch (error) {
    console.error(error)
    return { 
      products: [],
      currentPage: 1,
      totalPages: 1
    }
  }
}