"use client"
import { Product } from '../../../product/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/helpers/formats'
import { useState } from 'react'
import { getPathImageOrPlaceholder } from '@/features/product/components/product-custom-image/ProductCustomImage'

interface Props {
  product: Product
}


export const ProductGridItem = ({ product }: Props) => {

  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className='rounded-md overflow-hidden fade-in flex flex-col'>
      <Link
        href={`/product/${product.slug}`}
        className='flex-1'
      >
        <Image 
          src={getPathImageOrPlaceholder(displayImage)} 
          alt={product.title} 
          title={product.title} 
          width={500} 
          height={500} 
          className='w-full object-cover rounded h-full' 
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
          priority={displayImage === '1740250-00-A_0_2000.jpg'}
        />
      </Link>
      <div className='py-4 flex flex-col h-[112px]'>
        <Link
          href={`/product/${product.slug}`}
          className='font-semibold hover:text-gray-500 dark:hover:text-gray-300 transition-colors mb-2 tracking-wide line-clamp-2'
        >
          {product.title}
        </Link>
        <span className='font-bold'>
          {formatCurrency(product.price)}
        </span>
      </div>
    </div>
  )
}
