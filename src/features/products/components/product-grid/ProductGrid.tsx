import React from 'react'
import { Product } from '../../../product/interfaces'
import { ProductGridItem } from './ProductGridItem'

interface Props {
  products: Product[]
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 pb-10 px-4 md:px-0'>
      {
        products.map((product) => (
          <ProductGridItem key={product.slug} product={product} />
        ))
      }
    </div>
  )
}
