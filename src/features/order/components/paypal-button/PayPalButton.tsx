"use client"

import { ButtonsSkeleton } from '@/features/ui';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import React from 'react'
import toast from 'react-hot-toast';
import { setTransactionId } from '../../actions/set-transaction-id';
import { paypalCheckPayment } from '../../actions/paypal-check-payment';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100 // 100.00

  if (isPending) {
    return (
      <ButtonsSkeleton quantity={2} />
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
            currency_code: 'USD',
          }
        }
      ],
    })
    
    const { ok, message } = await setTransactionId(orderId, transactionId)
    
    if (!ok) {
      toast.error(message, {duration: 5000})
      throw new Error(message)
    }

    return transactionId
  }

  const onApprove = async(data: OnApproveData, actions: OnApproveActions): Promise<void>  => {
    const details = await actions.order?.capture()
    if (!details || !details.id) return

    const { message, ok } = await paypalCheckPayment(details.id)
    if (!ok) {
      toast.error(message)
      return
    }
    
    toast.success(message)
  }

  return (
    <div className='relative z-0'>
      <PayPalButtons  
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
