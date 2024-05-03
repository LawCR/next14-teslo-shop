'use client'
import Link from 'next/link'
import { CartProduct } from '../../interfaces/cart.interface'
import { formatCurrency } from '@/helpers/formats'
import { ProductCustomImage, QuantitySelector, useGetProductStock } from '@/features/product'
import { useCartStore } from '../../store/cart-store'

interface Props {
  product: CartProduct
}

export const CartProductItem = ({ product }: Props) => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const { stock, isLoading } = useGetProductStock(product.slug)

  return (
    <div key={`product-${product.slug}-${product.size}`} className='flex mb-5'>
      <ProductCustomImage
        src={product.image}
        alt={product.title}
        width={100}
        height={100}
        className='mr-5 rounded h-28 w-28'
      />

      <div className='w-full'>
        <div className='flex gap-4 mb-2'>
          <Link 
            href={`/product/${product.slug}`}
            className='tracking-wide font-semibold hover:text-gray-500 dark:hover:text-gray-300 flex-1 hover:underline'
          >
            {product.size} - {product.title}
          </Link>
          <p>{formatCurrency(product.price)}</p>
        </div>
        <QuantitySelector 
          className="gap-1" 
          quantity={product.quantity} 
          setQuantity={(quantity) => updateProductQuantity(product, quantity)}
          stock={stock}
          disabled={isLoading}
        />
        <button 
          className='underline mt-3'
          onClick={() => removeFromCart(product)}
        >Remover</button>
      </div>
    </div>
  )
}
