"use client"
import { formatCurrency } from '@/helpers/formats';
import { useClientLoaded } from '../../../shared/hooks/useClientLoaded';
import { Spinner } from '@/features/ui';
import { useAddressStore } from '../../address-store';
import { redirect, useRouter } from 'next/navigation';
import { useCartStore } from '@/features/cart';
import Link from 'next/link';
import { IoCreateOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { placeOrder } from '../../actions/place-order.action';

export const PlaceOrder = () => {

  const router = useRouter()
  const { loaded } = useClientLoaded()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const address = useAddressStore((state) => state.address)
  const { subtotal, taxes, total, totalItems } = useCartStore((state) => state.getSummaryInformation())
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (totalItems === 0) {
      redirect('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (!loaded) {
    return (
      <div className='h-[566px] flex justify-center items-center md:bg-backgroundPaper md:dark:bg-dbackgroundPaper shadow-xl md:dark:border-t-2 dark:border-white md:p-8 rounded-xl'>
        <Spinner />
      </div>
    )
  }
  
  if (!address?.firstName) {
    redirect('/checkout/address')
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }))

    const { ok, message, order } = await placeOrder(productsToOrder, address)
    if (!ok) {
      toast.error(message, { duration: 3000 })
      setIsPlacingOrder(false)
      return
    }
    
    clearCart()
    toast.success(message, { duration: 3000 })
    router.replace(`/orders/${order?.id}`)
    setIsPlacingOrder(false)
  }

  return (
    <div className='md:bg-backgroundPaper md:dark:bg-dbackgroundPaper shadow-xl md:dark:border-t-2 dark:border-white h-fit md:p-8 rounded-xl'>
      <div className='flex justify-between'>
        <h2 className='text-xl mb-2 font-semibold trackin flex-1'>
          Dirección de entrega
        </h2>
        <Link 
          href="/checkout/address"
          className="underline mb-5"
        >
          <IoCreateOutline size={24} title='Editar dirección' />
        </Link>
      </div>
      <div className='text-textSecondary dark:text-dtextSecondary'>
        <div className='flex gap-2'>
          <span className='font-semibold'>Nombre Completo:</span>
          <span className='text-right'>{address.firstName} {address.lastName}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>País:</span>
          <span className='text-right'>{address.countryId}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Departamento:</span>
          <span className='text-right'>{address.department}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Provincia:</span>
          <span className='text-right'>{address.province}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Distrito:</span>
          <span className='text-right'>{address.district}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Dirección:</span>
          <span className='text-right'>{address.address}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Código Postal:</span>
          <span className='text-right'>{address.postalCode}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Teléfono:</span>
          <span className='text-right'>{address.phone}</span>
        </div>
      </div>

      <div className='w-full h-px bg-gray-200 my-4' />

      <h2 className='text-xl mb-2 font-semibold trackin'>Resumen del pedido</h2>
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
      <div className='mt-5 mb-2 w-full'>
        <p className='mb-5'>
          <span className='text-xs'>
            Al hacer clic en &quot;Confirmar Pedido&quot;, aceptas nuestros
            &nbsp;
            <a href='/terms' className='underline'>
              Términos y Condiciones de Uso
            </a>{' '}
            y{' '}
            <a href='/terms' className='underline'>
              Política de Privacidad
            </a>
            .
          </span>
        </p>
        <button
          // href='/orders/123'
          className='flex btn-primary bg-disabled w-full justify-center tracking-widest'
          disabled={isPlacingOrder || totalItems === 0}
          onClick={onPlaceOrder}
        >
          CONFIRMAR PEDIDO
        </button>
      </div>
    </div>
  );
};
