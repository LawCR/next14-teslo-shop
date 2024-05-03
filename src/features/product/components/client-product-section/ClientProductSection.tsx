'use client'

import React, { useState } from 'react'
import { SizeSelector } from '../size-selector/SizeSelector';
import { StockLabel } from '../stock-label/StockLabel';
import { QuantitySelector } from '../quantity-selector/QuantitySelector';
import { Product, Size } from '../../interfaces';
import { useCartStore } from '@/features/cart';
import toast from 'react-hot-toast';
import { CartProduct } from '@/features/cart/interfaces/cart.interface';
import { useGetProductStock } from '../../hooks/useGetProductStock';

interface Props {
  product: Product;
}

export const ClientProductSection = ({ product }: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart)
  const [size, setSize] = useState<Size | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)
  const { stock, isLoading } = useGetProductStock(product.slug)

  const addToCart = () => {
    setPosted(true)
    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0]
    }
    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(null)
    toast.success("Producto agregado al carrito")
  }

  return (
    <>
      {
        posted && !size && (
          <span className='mt-2 text-sm text-red-600 dark:text-red-500 fade-in'>
            Debes de seleccionar una talla *
          </span>
        )
      }
      {/* Selector de Tallas */}
      <SizeSelector 
        selectedSize={size} 
        availableSizes={product.sizes} 
        onSizeChange={setSize}
      />
      {/* Stock Label */}
      <StockLabel 
        isLoading={isLoading} 
        stock={stock} 
      />
      {/* Selector de Cantidad */}
      <QuantitySelector 
        quantity={quantity} 
        setQuantity={setQuantity}
        stock={stock}
      />
      {
        (stock === 0 && !isLoading)  && (
          <p className='mt-5 text-sm text-red-600 dark:text-red-500 fade-in'>
            No hay stock disponible
          </p>
        )
      }
      {/* Button */}
      <button 
        className="btn-primary  my-5 w-full uppercase bg-disabled" 
        disabled={stock === 0}
        onClick={addToCart}
      >
        Agregar al carrito
      </button>
  </>
  )
}
