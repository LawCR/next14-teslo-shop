'use server'

import prisma from '@/lib/prisma'
import { Address } from '../interfaces/address.interface'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceUserAddress(address, userId)
    return {
      ok: true,
      address: newAddress,
      message: 'Dirección guardada correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al guardar la dirección del usuario'
    }
  }
}

const createOrReplaceUserAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findFirst({
      where: { userId }
    });

    const addressToSave = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      phone: address.phone,
      countryId: address.countryId,
      department: address.department,
      province: address.province,
      district: address.district,
      userId,
      // city: address.city,
      // rememberAddress: address.rememberAddress,
    }

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updatedAddress
  } catch (error) {
    console.log(error)
    throw new Error('Error al guardar la dirección del usuario')
  }
}