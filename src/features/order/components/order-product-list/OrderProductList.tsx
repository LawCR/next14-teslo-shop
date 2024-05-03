'use client'

import { OrderItem } from '../../interfaces/order.interface';
import { OrderProductItem } from './OrderProductItem';

interface Props {
  items: OrderItem[];
}

export const OrderProductList = ({ items }: Props) => {

  return (
    <>
      {items.map((product) => (
        <OrderProductItem key={`product-${product.product.slug}-${product.size}`} item={product} />
      ))}
    </>
  );
};
