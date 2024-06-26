import clsx from 'clsx'
import React from 'react'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  isPaid: boolean
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div className={clsx(
      "flex items-center rounded-lg py-2 px-3.5  font-bold text-dtext mb-5", {
      "bg-red-600": !isPaid,
      "bg-green-700": isPaid,
      }
    )}>
      <IoCardOutline size={30} />
      {
        isPaid 
        ? <span className="ml-2 text-white">Pago Realizado</span>
        : <span className="ml-2 text-white">Pendiente de Pago</span>
      }
    </div>
  )
}
