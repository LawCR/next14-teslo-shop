'use server'

import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Product, ProductImage } from "../interfaces"

export const getProductsBySlug = async (slug: string, redirectAuto: boolean = true): Promise<Product & { productImages?: ProductImage[] } | null> => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        images: {
          select: {
            url: true,
            id: true
          }
        }
      },
      where: {
        slug
      }
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      images: product.images.map(image => image.url),
      productImages: product.images
    }
  } catch (error) {
    console.log(error)
    // throw new Error('Error fetching products by slug')
    return null
  }
}