'use client'
import { formatCurrency } from '@/helpers/formats'
import { CartProduct } from '@/features/cart/interfaces/cart.interface'
import { ProductCustomImage } from '@/features/product'

interface Props {
  product: CartProduct
}

export const CheckoutProductItem = ({ product }: Props) => {

  return (
    <div key={`product-${product.slug}-${product.size}`} className='flex mb-5'>
      <ProductCustomImage
        src={product.image}
        alt={product.title}
        width={100}
        height={100}
        className="mr-5 rounded h-28 w-28"
      />

      <div className="w-full">
        <p className="tracking-wide font-semibold flex-1">{product.size} - {product.title}</p>
        <p>{formatCurrency(product.price)}</p>
        <p>{product.quantity === 1 ? `1 artículo` : `${product.quantity} artículos`}</p>
        <p className="font-bold">Subtotal: {formatCurrency(product.price * product.quantity)}</p>
      </div>
    </div>
  )
}
