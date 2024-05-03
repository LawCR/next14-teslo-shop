'use client'
import Link from 'next/link';
import Image from 'next/image'
import { formatCurrency } from '@/helpers/formats'
import { OrderItem } from '../../interfaces/order.interface';
import { ProductCustomImage } from '@/features/product';

interface Props {
  item: OrderItem;
}

export const OrderProductItem = ({ item }: Props) => {

  const { product, size, quantity, price } = item

  return (
    <div key={`product-${product.slug}-${size}`} className='flex mb-5'>
      <ProductCustomImage
        src={product.images[0]?.url}
        alt={product.title}
        width={100}
        height={100}
        className="mr-5 rounded h-28 w-28"
      />

      <div className="w-full">
        <Link 
          href={`/product/${product.slug}`}
          className='tracking-wide font-semibold hover:text-gray-500 dark:hover:text-gray-300 flex-1 hover:underline'
        >
          {size} - {product.title}
        </Link>
        {/* <p className="tracking-wide font-semibold flex-1">{size} - {product.title}</p> */}
        <p>{formatCurrency(price)}</p>
        <p>{quantity === 1 ? `1 artículo` : `${quantity} artículos`}</p>
        <p className="font-bold">Subtotal: {formatCurrency(price * quantity)}</p>
      </div>
    </div>
  )
}
