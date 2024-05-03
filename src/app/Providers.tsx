'use client'

import AuthProvider from '@/features/auth/providers/AuthProvider'
import PaypalProvider from '@/features/order/providers/PaypalProvider'
import { Toaster } from 'react-hot-toast'


export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AuthProvider>
      <PaypalProvider>
        <Toaster toastOptions={{ duration: 3500 }} />
        {children}
      </PaypalProvider>
    </AuthProvider>
  )
}