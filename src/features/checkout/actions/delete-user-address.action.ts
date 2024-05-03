"use server"

import prisma from '@/lib/prisma'
import { getUserAddress } from './get-user-address.action';

export const deleteUserAddress = async (userId: string) => {
  try {
    const existAddress = await getUserAddress(userId);
    if (!existAddress) {
      return {
        ok: true,
        message: 'Dirección no guardada, puedes continuar con tu compra'
      }
    }

    await prisma.userAddress.delete({
      where: { userId }
    });

    return {
      ok: true,
      message: 'Dirección no guardada, puedes continuar con tu compra'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Hubo un error, intenta de nuevo'
    }
  }
}