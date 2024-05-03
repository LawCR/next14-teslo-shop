'use client'

import { useEffect, useState } from 'react'
import { getStockBySlug } from '../actions/get-stock-by-slug'

export const useGetProductStock = (slug: string) => {

  const [stock, setStock] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStock = async() => {
      const inStock = await getStockBySlug(slug)
      setStock(inStock)
      setIsLoading(false)
    }

    getStock()
  }, [slug, setStock])

  return {
    stock,
    isLoading
  }
}
