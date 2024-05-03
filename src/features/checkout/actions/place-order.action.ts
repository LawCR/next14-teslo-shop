"use server"

import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { Address } from '@/features/checkout';
import { Size } from '@/features/product';
import { revalidatePath } from 'next/cache';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productsToOrder: ProductToOrder[], address: Address) => {

  const session = await auth()
  const userId = session?.user.id
  if (!userId) {
    return {
      ok: false,
      message: 'Se ha cerrado la sesión, por favor inicia sesión nuevamente'
    }
  }

  try {
    // Obtener la información de los productos teniendo en cuenta que se puede llevar +2 productos con el mismo id pero con tallas diferentes
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsToOrder.map((p) => p.productId)
        }
      }
    })

    // calcular la cantidad de productos en el pedido
    const itemsInOrder = productsToOrder.reduce((acc, item) => acc + item.quantity, 0)
    
    // Calcular los totales de tax, subtotal y total
    const { tax, subTotal, total } = productsToOrder.reduce((acc, item) => {
      const productQuantity = item.quantity
      const product = products.find((p) => p.id === item.productId)
      if (!product) throw new Error(`Producto #${item.productId} no existe`)

      const subTotal = product.price * productQuantity;
      acc.subTotal += subTotal
      acc.tax += subTotal * 0.15
      acc.total += subTotal * 1.15

      return acc
    }, { tax: 0, subTotal: 0, total: 0 })

    // Crear la transacción en la base de datos
    const prismaTx = await prisma.$transaction(async(tx) => {
      //* 1. Actualizar el stock de los productos y validar que el stock no este en negativo
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productsToOrder
          .filter(p => p.productId === product.id)
          .reduce((acc, item) => acc + item.quantity, 0)

        if (productQuantity === 0) throw new Error(`La cantidad del producto "${product.title}" no puede ser 0`)

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) throw new Error(`El producto "${product.title}" no tiene suficiente stock`)
      })


      //* 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          orderItems: {
            createMany: {
              data: productsToOrder.map(p => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((product) => product.id === p.productId)?.price || 0
              }))
            }
          }
        }
      })

      //* 3. Validar que si el total es 0, lanzar error
      if (total <= 0) throw new Error('El total del pedido no puede ser 0')

      //* 4. Crear la dirección de envío de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...address,
          orderId: order.id
        }
      })

      return {
        order,
        updatedProducts,
        orderAddress
      }
    })

    revalidatePath(`/orders`)

    return { 
      ok: true, 
      message: 'Pedido realizado con éxito', 
      order: prismaTx.order
    }
  } catch (error: any) {
    console.log(error)
    return {
      ok: false,
      message: error.message
    }
  }
}