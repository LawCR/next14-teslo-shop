"use server"

import prisma from '@/lib/prisma'

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId }
    });

    if (!address) return null

    const { id, userId: _, ...restAddress } = address

    return restAddress
  } catch (error) {
    console.log(error)
    return null
  }
}