"use client"

import { PayPalScriptProvider } from '@paypal/react-paypal-js';


interface Props {
  children: React.ReactNode;
}

export default function PaypalProvider({ children }: Props) {
  return (
    <PayPalScriptProvider 
      options={{ 
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        intent: 'capture', // Es para capturar el pago
        currency: 'USD', // Para soles
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}