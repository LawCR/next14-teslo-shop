import NextAuth from 'next-auth';
import { authConfig } from './config/auth.config';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from "zod";
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider,
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null; // Si las credenciales no son válidas

        const { email, password } = parsedCredentials.data;

        // Validar el correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) return null; // Si el usuario no existe

        // Validar la contraseña
        if (!bcrypt.compareSync(password, user.password || '')) return null; // Si la contraseña no es válida

        // Regresar el usuario sin la contraseña
        const { password: _, ...restUser } = user;
        return restUser
      },
    }),
  ],
});
