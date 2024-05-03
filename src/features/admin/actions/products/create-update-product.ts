"use server"

import { z } from 'zod';
import { Gender } from '@prisma/client';
import { AUTH_CONSTANTS, Role } from '@/features/auth';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Product, Size } from '@/features/product';
import { revalidatePath } from 'next/cache';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryFolder } from '@/features/shared';

cloudinary.config(process.env.CLOUDINARY_URL || '');

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce.number().min(0).transform( value => Number(value.toFixed(2)) ),
  inStock: z.coerce.number().min(0).transform( value => Number(value.toFixed(0)) ),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform( value => value.split(',') ),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export const createUpdateProduct = async (formData: FormData) => {
  const validRoles = [AUTH_CONSTANTS.ROLES.ADMIN]
  const session = await auth()

  if (!validRoles.includes(session?.user.role as Role)) return {
    ok: false,
    message: 'Usuario no autorizado',
  }

  const data = Object.fromEntries(formData.entries());
  const productParsed = productSchema.safeParse(data);
  
  if (!productParsed.success) {
    console.log(productParsed.error.errors)
    return {
      ok: false,
      message: 'Algunos campos no son válidos',
    }
  }

  const product = productParsed.data
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()
  const { id, ...restProduct } = product

  try {
    const prismaTx = await prisma.$transaction(async(tx) => {
    
      let productUpdated: Partial<Product>;
      let message = ''
      const tagsArray = restProduct.tags.split(',').map(tag => tag.trim().toLowerCase())
  
      if (id) {
        // Actualizar producto
        productUpdated = await tx.product.update({
          where: { id },
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[]
            },
            tags: {
              set: tagsArray
            },
          }
        })
        message = 'Producto actualizado correctamente'
      } else {
        // Crear producto
        productUpdated = await tx.product.create({
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[]
            },
            tags: {
              set: tagsArray
            },
          }
        })
        message = 'Producto creado correctamente'
      }

      // Proceso de carga y guardado de imágenes
      // Recorrer las imagenes y guardarlas en el servidor
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])
        if (!images) throw new Error('Error al cargar las imágenes')

        await tx.productImage.createMany({
          data: images.map((url) => ({
            url,
            productId: productUpdated.id
          })) as any
        })
      }
  
      return {
        product: productUpdated,
        message
      }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/product/${product.slug}`)
  
    return {
      ok: true,
      message: prismaTx.message,
      product: prismaTx.product
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: id ? 'Error al actualizar el producto' : 'Error al crear el producto'
    }
  }
}

const uploadImages = async (imagesFile: File[], folderType: CloudinaryFolder = 'products') => {
  try {
    const mainFolder = process.env.CLOUDINARY_FOLDER_MAIN
    const folder = `${mainFolder}/${folderType}`
    const uploadPromises = imagesFile.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')
  
        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
          folder,
          // use_filename: true, // Es el nombre original del archivo
          // unique_filename: false, // Si es true, se genera un nombre único
          // overwrite: false, // Si es true, sobreescribe la imagen
          // transformation: [
          //   { width: 800, height: 800, crop: 'fill' } // Tamaño de la imagen
          // ]
        }).then((result) => result.secure_url)
      } catch (error) {
        console.log(error)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)
    return uploadedImages
  } catch (error) {
    console.error(error)
    return null
  }
}