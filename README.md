
# Descripción
Aplicación Teslo Shop inspirada en Tesla para el desarrollo de un ecommerce desarrollado con Nextjs 14 donde se aprendieron y reforzaron las siguientes tecnologias:

- Nextjs 14
- Server Side Rendering
- Client Side Rendering
- Incremental & Static Generation
- Next API Routes
- Next Server Actions
- Optimistic Updates
- Manejo de Cookies
- Paginación
- SEO
- Metadata Estática & Dinámica
- OpenGraph 
- Zustand - Global State
- Tailwind
- Next Auth - Google Provider - Credentials Provider
- Sesiones
- Protección de Rutas
- React Hook Form
- PostgreSQL
- Pagos con PayPal
- Prisma
- Prisma Transactions
- Seeds
- Cloudinary

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.template```  y renombrarlo a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias 
``` 
  npm install 
```
4. Levantar la base de datos
``` 
  docker compose up -d 
```
5. Correr las migraciones de Prisma
``` 
  npx prisma migrate dev
```
6. Ejecutar seed
``` 
  npm run seed
```
6. Correr el proyecto 
``` 
  npm run dev 
```

## Correr en prod