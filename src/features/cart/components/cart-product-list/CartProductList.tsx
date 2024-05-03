'use client'

import { Spinner } from '@/features/ui';
import { useCartStore } from '../../store/cart-store';
import { CartProductItem } from './CartProductItem';
import { useClientLoaded } from '@/features/shared';

export const CartProductList = () => {

  const { loaded } = useClientLoaded()
  const productsInCart = useCartStore((state) => state.cart);

  if (!loaded) {
    return <Spinner className='mt-6' /> 
  }

  return (
    <>
      {productsInCart.map((product) => (
        <CartProductItem key={`product-${product.slug}-${product.size}`} product={product} />
      ))}
    </>
  );
};
