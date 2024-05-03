
import { Role } from '@/features/auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type NextAuthConfig } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const authenticatedRoutes = [
  "/checkout",
  "/profile",
  "/orders",
  "/admin",
];

// const validRoutesByRole = {
//   admin: [
//     "/gender",
//     "/profile",
//     "/admin", // Todas las rutas que empiecen con /admin
//   ],
//   employee: [
//     "/gender",

//     "/profile",
//     "/admin/dashboard",
//     "/admin/orders",
//   ],
//   client: [
//     "/gender",
//     "/profile",
//     "/orders",
//     "/checkout",
//   ],
// };

const notValidRoutesByRole = {
  admin: [],
  employee: [
    "/admin/users",
    "/admin/products",
    "/admin/categories",
  ],
  client: [
    "/admin",
  ],
};

const isNotValidRoutesByRole = (role: Role, onRoute: string) => {
  return notValidRoutesByRole[role].some((validRoutebyRole) =>
    onRoute.startsWith(validRoutebyRole)
  );
}

const isOnAuthenticatedRoutes = (onRoute: string) => {
  return authenticatedRoutes.some((authRoute) =>
    onRoute.startsWith(authRoute)
  );
};

const prisma = new PrismaClient()

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  adapter: PrismaAdapter(prisma), // 
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        if (isNotValidRoutesByRole(auth.user.role, nextUrl.pathname)) {
          return Response.redirect(new URL('/', nextUrl));
        }

        // Ruta permitida para cualquier usuario autenticado
        return true
      }
      
      if (isOnAuthenticatedRoutes(nextUrl.pathname)) {
        return false;
      }
      
      return true;
    },
    jwt: async ({token, user, account, profile}) => {
      if (user) {
        token.data = user
        delete (token.data as any)?.password 
      }
      return token
    },
    session: async ({session, token, user}) => {
      session.user = token.data as any
      return session
    },
    // signIn: async ({ user, credentials, account }) => {
    //   return true
    // },
  },
  providers: []
}
