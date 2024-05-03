"use server"
import prisma from "@/lib/prisma"

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const product = await prisma.product.findFirst({
      select: { inStock: true },
      where: { slug }
    })

    if (!product) return 0

    return product.inStock
  } catch (error) {
    console.log(error)
    return 0
  }
}