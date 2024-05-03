"use server"

import { auth } from '@/auth';
import { Role } from '@/features/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type UserData = {
  // email?: string
  role?: Role
  image?: string;
  name?: string;
  isActive?: boolean;
  emailVerified?: Date;
}

export const adminUpdateUser = async (userId: string, data: UserData = {}) => {
  const validRoles = ['admin']
  const session = await auth()

  if (!validRoles.includes(session?.user.role || 'no-role')) return {
    ok: false,
    message: 'Usuario no autorizado',
  }

  try {
    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data
      }
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      user: userUpdated,
      message: 'Usuario actualizado correctamente',
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al actualizar el usuario',
    }
  }
}