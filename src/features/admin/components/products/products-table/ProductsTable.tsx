import { Product, ProductCustomImage } from '@/features/product';
import { formatCurrency } from '@/helpers/formats';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface Props {
  products: Product[];
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <div className='mb-10 w-full overflow-x-auto'>
      <table className='min-w-full'>
        <thead className='bg-gray-200 dark:bg-dhoverLink border-b'>
          <tr>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Imagen
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Título
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Precio
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Género
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Stock
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Tallas
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            products.length === 0 ? (
              <tr className='bg-background dark:bg-dbackgroundPaper border-b'>
                <td colSpan={6} className='text-center py-4 text-textSecondary2 dark:text-dtextSecondary'>
                  No hay productos disponibles
                </td>
              </tr>
            ) :   
            products.map((product) => (
              <tr
                key={product.id}
                className='bg-background dark:bg-dbackgroundPaper hover:bg-hoverLink dark:hover:bg-dhoverLink border-b transition duration-100 ease-in-out '
              >
                <td className='px-2 py-4 w-24 whitespace-nowrap text-sm font-medium text-text dark:text-dtext'>
                  <Link href={`/product/${product.slug}`}>
                    {/* <Image
                      src={`/products/${product.images[0]}`}
                      alt={product.title}
                      width={80}
                      height={80}
                      className='w-20 h-20 object-cover rounded-md'
                    /> */}
                    <ProductCustomImage
                      alt={product.title}
                      height={80}
                      width={80}
                      src={product.images[0]}
                      className='w-20 h-20 object-cover rounded-md'
                    />
                  </Link>
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {/* {getFormattedDateTime(new Date(product.createdAt))} */}
                  <Link href={`/admin/product/${product.slug}`} className='hover:underline'>
                    {product.title}
                  </Link>
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {formatCurrency(product.price)}
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {product.gender}
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {product.inStock}
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {product.sizes.join(', ')}
                </td>
                <td className='text-sm font-light px-6 '>
                  <Link
                    href={`/product/${product.slug}`}
                    className='hover:underline text-blue-600 dark:text-blue-400'
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
