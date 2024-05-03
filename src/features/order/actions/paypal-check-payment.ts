'use server';

import prisma from '@/lib/prisma';
import { PayPalOrderStatusResponse } from '../interfaces/paypal.interface';
import { revalidatePath } from 'next/cache';

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de autenticación',
    };
  }

  const response = await verifyPayPalPayment(paypalTransactionId, authToken);
  if (!response) {
    return {
      ok: false,
      message: 'Hubo un error al verificar el pago',
    };
  }

  const { status, purchase_units } = response;
  const { invoice_id: orderId } = purchase_units[0];
  
  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'El pago no se ha completado en Paypal',
    };
  }

  try {
    // Actualizar el estado del pedido en la base de datos
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      }
    })

    // Revalidar el Path para actualizar el estado del pedido
    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      message: 'Pago realizado con éxito',
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Hubo un error al actualizar el estado del pedido',
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL || '';
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  try {
    const response = await fetch(PAYPAL_OAUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Token}`,
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async(paypalTransactionId: string, bearerToken: string): Promise<PayPalOrderStatusResponse | null> => {
  const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL;

  try {
    const response = await fetch(`${PAYPAL_ORDERS_URL}/${paypalTransactionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      cache: 'no-store',
    });
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return null
  }
}