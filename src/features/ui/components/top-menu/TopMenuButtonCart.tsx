'use client'
import Link from 'next/link'
import { useCartStore } from '@/features/cart'
import { IoCartOutline } from 'react-icons/io5'
import { useClientLoaded } from '@/features/shared'

export const TopMenuButtonCart = () => {
  const { loaded } = useClientLoaded()
  const totalItems = useCartStore(state => state.getTotalItems())

  return (
    <Link
      href={(loaded && totalItems === 0) ? '/empty' : '/cart'}
      className='btn-link mr-[3px]'
      title='Ver carrito'
      id='cart-link'
    >
      <div className='relative'>
        {
          (loaded && totalItems > 0) && (
            <span className="fade-in absolute -top-2 left-[12px] rounded-full bg-blue-600 text-xs text-red-50 px-1">{totalItems}</span>
          )
        }
        <IoCartOutline className='w-6 h-5' />
      </div>
    </Link>
  )
}
