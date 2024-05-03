'use client'

import { Spinner } from '@/features/ui';
import { useClientLoaded } from '@/features/shared';
import { CheckoutProductItem } from './CheckoutProductItem';
import { useCartStore } from '@/features/cart';

export const CheckoutProductList = () => {

  const { loaded } = useClientLoaded()
  const productsInCart = useCartStore((state) => state.cart);

  if (!loaded) {
    return <Spinner className='mt-6' /> 
  }

  return (
    <>
      {productsInCart.map((product) => (
        <CheckoutProductItem key={`product-${product.slug}-${product.size}`} product={product} />
      ))}
    </>
  );
};
