import { Order } from '../../interfaces/order.interface';
import { formatCurrency } from '@/helpers/formats';
import { PayPalButton } from '../paypal-button/PayPalButton';
import { OrderStatus } from '../order-status/OrderStatus';

interface Props {
  order: Order
}

export const OrderSummary = ({ order }: Props) => {

  const { orderAddress: address, itemsInOrder, subTotal, tax, total, userId} = order

  // TODO: Crear un link para ver la informacion del usuario si eres admin "userId"
  
  return (
    <div className='md:bg-backgroundPaper md:dark:bg-dbackgroundPaper shadow-xl md:dark:border-t-2 dark:border-white h-fit md:p-8 rounded-xl'>
      <h2 className='text-xl mb-2 font-semibold trackin'>
        Dirección de entrega
      </h2>
      <div className='text-textSecondary dark:text-dtextSecondary'>
        <div className='flex gap-2'>
          <span className='font-semibold'>Nombre Completo:</span>
          <span className='text-right'>{address?.firstName || ""} {address?.lastName || ""}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>País:</span>
          <span className='text-right'>{address?.countryId || ""}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Departamento:</span>
          <span className='text-right'>{address?.department || ""}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Provincia:</span>
          <span className='text-right'>{address?.province || ""}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Distrito:</span>
          <span className='text-right'>{address?.district || ""}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Dirección:</span>
          <span className='text-right'>{address?.address || ""}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Código Postal:</span>
          <span className='text-right'>{address?.postalCode || ""}</span>
        </div>
        <div className='flex gap-2'>
          <span className='font-semibold'>Teléfono:</span>
          <span className='text-right'>{address?.phone || ""}</span>
        </div>
      </div>


      <div className='w-full h-px bg-gray-200 my-4' />

      <h2 className='text-xl mb-2 font-semibold trackin'>Resumen del pedido</h2>
      <div className='grid grid-cols-2 text-textSecondary dark:text-dtextSecondary'>
        <span>No. Productos</span>
        <span className='text-right'>{itemsInOrder === 1 ? `1 artículo` : `${itemsInOrder} artículos`}</span>
        <span>Subtotal</span>
        <span className='text-right'>{formatCurrency(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className='text-right'>{formatCurrency(tax)}</span>

        <span className='mt-5 text-xl font-semibold text-text dark:text-dtext'>
          Total:
        </span>
        <span className='mt-5 text-xl text-right font-semibold text-text dark:text-dtext'>
          {formatCurrency(total)}
        </span>
      </div>
      <div className='mt-5 mb-4 w-full'>
        {
          order.isPaid ? (
            <OrderStatus isPaid={order.isPaid} />
          ) : (
            <PayPalButton  
              amount={total}
              orderId={order.id}
            />
          )
        }
      </div>
    </div>
  );
};
