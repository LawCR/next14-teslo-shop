'use server'

import { AuthError } from 'next-auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn, signOut } from '@/auth';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    if (!formData.get('email') || !formData.get('password')) {
      return 'Por favor, rellenar todos los campos.';
    }
    
    // await signIn('credentials', formData);
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'success'
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales inválidas.';
        default:
          return 'Hubo un error al iniciar sesión.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({name, email, password}: RegisterProps) {
  try {

    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) {
      return {
        ok: false,
        message: 'El correo electrónico ya está en uso.'
      }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return {
      ok: true,
      message: 'Usuario registrado correctamente.',
      user
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Hubo un error al registrar el usuario.'
    }
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password })

    return {
      ok: true,
      message: 'Inicio de sesión exitoso.'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Hubo un error al iniciar sesión.'
    }
  }
}