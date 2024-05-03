import prisma from '../lib/prisma';
import { initialData } from "./seed"
import { countries } from './seed-countries';

async function main() {

  //* Borramos todos los datos de la base de datos
  await prisma.orderAddress.deleteMany(),
  await prisma.orderItem.deleteMany(),
  await prisma.order.deleteMany(),

  await prisma.userAddress.deleteMany(),
  await prisma.user.deleteMany(),
  await prisma.country.deleteMany()

  await prisma.productImage.deleteMany(),
  await prisma.product.deleteMany(),
  await prisma.category.deleteMany()

  const { categories, products, users } = initialData

  //* Crear usuarios
  await prisma.user.createMany({ data: users })

  //* Crear categorias
  const categoriesData = categories.map(name => ({ name }))
  await prisma.category.createMany({ data: categoriesData })

  //* Crear productos
  const categoriesDB = await prisma.category.findMany()

  const categoriesMap = categoriesDB.reduce((acc, category) => {
    acc[category.name.toLowerCase()] = category.id
    return acc
  }, {} as Record<string, string>)

  products.forEach(async(product) => {
    const { type, images, ...rest } = product
    // Producto con su relacion de categoria e imagen
    await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
        images: {
          createMany: {
            data: images.map(image => ({ url: image }))
          }
        }
      }
    })
  })

  //* Crear paises
  await prisma.country.createMany({ data: countries })
  
  console.log('Seed executed successfully!')
}

(() => {
  main()
})()