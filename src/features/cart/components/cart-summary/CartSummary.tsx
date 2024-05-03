"use client"
import { formatCurrency } from '@/helpers/formats';
import { useCartStore } from '../../store/cart-store';
import { useClientLoaded } from '@/features/shared';
import { Spinner } from '@/features/ui';
import { redirect } from 'next/navigation';

export const CartSummary = () => {

  const { loaded } = useClientLoaded()
  const { subtotal, taxes, total, totalItems } = useCartStore((state) => state.getSummaryInformation())

  if (!loaded) {
    return <Spinner className='mt-4' />  
  }

  if (totalItems === 0) {
    redirect('/empty')
  }

  return (
    <div className='grid grid-cols-2 text-textSecondary dark:text-dtextSecondary'>
      <span>No. Productos</span>
      <span className='text-right'>{totalItems === 1 ? `1 artículo` : `${totalItems} artículos`}</span>
      <span>Subtotal</span>
      <span className='text-right'>{formatCurrency(subtotal)}</span>
      <span>Impuestos (15%)</span>
      <span className='text-right'>{formatCurrency(taxes)}</span>

      <span className='mt-5 text-xl font-semibold text-text dark:text-dtext'>
        Total:
      </span>
      <span className='mt-5 text-xl text-right font-semibold text-text dark:text-dtext'>
        {formatCurrency(total)}
      </span>
    </div>
  );
};
