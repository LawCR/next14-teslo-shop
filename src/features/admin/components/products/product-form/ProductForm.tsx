'use client';

import { createUpdateProduct } from '@/features/admin/actions/products/create-update-product';
import { deleteProductImage } from '@/features/admin/actions/products/delete-product-image';
import { Gender, Product } from '@/features/product';
import { ProductCustomImage, getPathImageOrPlaceholder } from '@/features/product/components/product-custom-image/ProductCustomImage';
import { ProductImage } from '@/features/product/interfaces';
import { Category } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoCloseCircle } from 'react-icons/io5';

interface Props {
  product: Partial<Product> & { productImages?: ProductImage[] };
  categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Gender;
  categoryId: string;

  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      gender: product.gender,
      categoryId: product.categoryId,
      tags: product?.tags?.join(', '),
      sizes: product.sizes || [],
      images: undefined,
    },
  });

  watch('sizes');

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes));
  };

  const onDeleteImage = async (imageId: number, imageUrl: string) => {
    setIsDeleting(true)
    const { message, ok } = await deleteProductImage(imageId, imageUrl)
    if (!ok) {
      toast.error(message)
      return
    }
    toast.success(message)
    setIsDeleting(false)
  }

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const { images, ...productToSave } = data;

    const formData = new FormData();
    if (product.id) {
      formData.append('id', product.id);
    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const { ok, message, product: productUpdated } = await createUpdateProduct(formData);
    if (!ok) {
      toast.error(message);
      return;
    }

    toast.success(message);
    setIsLoading(false);
    router.replace(`/admin/product/${productUpdated?.slug}`);
  };

  return (
    <form
      className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 px-4 md:px-0 mb-16'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className='w-full'>
        <div className='flex flex-col mb-4'>
          <span>Título</span>
          <input
            type='text'
            className='input-form'
            {...register('title', { required: 'Este campo es requerido' })}
          />
          {errors.title && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.title.message}
            </p>
          )}
        </div>

        <div className='flex flex-col mb-4'>
          <span>Descripción</span>
          <textarea
            rows={5}
            className='input-form'
            {...register('description', {
              required: 'Este campo es requerido',
            })}
          />
          {errors.description && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.description.message}
            </p>
          )}
        </div>

        <div className='flex flex-col mb-4'>
          <span>Price</span>
          <input
            type='number'
            className='input-form'
            {...register('price', {
              required: 'Este campo es requerido',
              min: { value: 1, message: 'El precio debe ser mayor a 0' },
            })}
          />
          {errors.price && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.price.message}
            </p>
          )}
        </div>

        <div className='flex flex-col mb-4'>
          <span>Stock</span>
          <input
            type='number'
            className='input-form'
            {...register('inStock', {
              required: 'Este campo es requerido',
              min: { value: 1, message: 'El stock debe ser mayor a 0' },
            })}
          />
          {errors.inStock && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.inStock.message}
            </p>
          )}
        </div>

        <div className='flex flex-col mb-4'>
          <span>Tags</span>
          <input
            type='text'
            className='input-form'
            {...register('tags', { required: 'Este campo es requerido' })}
          />
          {errors.tags && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.tags.message}
            </p>
          )}
        </div>

        <div className='flex flex-col mb-4'>
          <span>Gender</span>
          <select
            className='input-form'
            {...register('gender', { required: 'Este campo es requerido' })}
          >
            <option value=''>[Seleccione]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
          {errors.gender && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.gender.message}
            </p>
          )}
        </div>

        <div className='flex flex-col mb-4'>
          <span>Categoria</span>
          <select
            className='input-form'
            {...register('categoryId', { required: 'Este campo es requerido' })}
          >
            <option value=''>[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className='hidden sm:flex justify-end items-center gap-3 mt-5'>
          <Link href='/admin/products' className='btn-secondary flex-grow lg:flex-grow-0 block w-32 text-center'>Volver</Link>
          <button 
            className='btn-primary bg-disabled flex-grow lg:flex-grow-0 block w-32' 
            disabled={isDeleting || isLoading}
          >Guardar</button>
        </div>
      </div>

      {/* Selector de tallas y fotos */}
      <div className='w-full'>
        <div className='flex flex-col mb-4'>
          <span>Slug</span>
          <input
            type='text'
            className='input-form'
            {...register('slug', { required: 'Este campo es requerido' })}
          />
          {errors.slug && (
            <p role='alert' className='text-sm text-red-600 mt-1'>
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Tallas</span>
          <div className='flex flex-wrap mt-1 mb-4 gap-3'>
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className={clsx(
                  'flex text-sm font-medium items-center justify-center w-14 py-2 px-4 border rounded-md cursor-pointer',
                  {
                    'btn-primary': getValues('sizes').includes(size),
                    'hover:bg-gray-100 dark:hover:bg-gray-700':
                      !getValues('sizes').includes(size),
                  }
                )}
                onClick={() => onSizeChange(size)}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col mb-4'>
            <span>Fotos</span>
            <input
              type='file'
              multiple
              className='input-form'
              accept='image/png, image/jpeg, image/jpg, image/avif'
              {...register('images')}
            />

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5'>
              {product?.productImages?.map((image, index) => (
                <div key={index} className='relative'>
                  <ProductCustomImage
                    src={getPathImageOrPlaceholder(image.url)}
                    alt={product.title || 'Nueva imagen de producto'}
                    className='w-full h-40 object-cover rounded-md shadow-md'
                    width={200}
                    height={200}
                  />
                  <button
                    type='button'
                    className='absolute top-2 right-2  flex items-center justify-center text-red-500 hover:text-red-700 transition text-disabled'
                    title='Eliminar imagen'
                    onClick={() => onDeleteImage(image.id, image.url)}
                    disabled={isDeleting || isLoading}
                  >
                    <IoCloseCircle
                      size={30}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col sm:hidden justify-center items-center gap-3 mt-4'>
            <button 
              className='btn-primary bg-disabled w-full' 
              disabled={isDeleting || isLoading}
            >Guardar</button>
            <Link href='/admin/products' className='btn-secondary w-full text-center'>Volver</Link>
          </div>
        </div>
      </div>
    </form>
  );
};
