'use server'
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryFolder } from '@/features/shared';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL || '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'No se puede eliminar la imagen - Imagen Seed',
    }
  }

  const imageName = imageUrl?.split('/').pop()?.split('.')[0] || ''

  try {
    // Eliminar imagen de Cloudinary
    const response = await deleteImageCloudinary(imageName, 'products')
    if (!response) {
      return {
        ok: false,
        message: 'Hubo un error al eliminar la imagen',
      }
    }

    // Eliminar imagen de la base de datos
    const deletedImageSlug = await prisma.productImage.delete({
      where: { id: imageId },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath(`/admin/product/${deletedImageSlug.product.slug}`)
    revalidatePath(`/admin/products`)
    revalidatePath(`/product/${deletedImageSlug.product.slug}`)

    return {
      ok: true,
      message: 'Imagen eliminada correctamente',
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Hubo un error al eliminar la imagen',
    }
  }
}

export const deleteImageCloudinary = async (imageName: string, folderType: CloudinaryFolder) => {
  const mainFolder = process.env.CLOUDINARY_FOLDER_MAIN
  const folder = `${mainFolder}/${folderType}/${imageName}`

  try {
    await cloudinary.uploader.destroy(folder)
    return true
  } catch (error) {
    console.error(error)
    return null
  }
}