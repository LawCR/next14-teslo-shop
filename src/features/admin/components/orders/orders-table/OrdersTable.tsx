import { formatCurrency, getFormattedDateTime } from '@/helpers/formats';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';


interface Order {
  id:           string;
  subTotal:     number;
  tax:          number;
  total:        number;
  itemsInOrder: number;
  isPaid:       boolean;
  paidAt:       null | Date;
  createdAt:    Date;
  updatedAt:    Date;
  userId:       string;
  orderAddress: OrderAddress | null;
}

interface OrderAddress {
  firstName: string;
  lastName:  string;
  address:   string;
  district:  string;
}


interface Props {
  orders: Order[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <div className='mb-10 w-full overflow-x-auto'>
      <table className='min-w-full'>
        <thead className='bg-gray-200 dark:bg-dhoverLink border-b'>
          <tr>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              #ID
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Nombre completo
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Fecha de Pedido
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Total
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Estado
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            orders.length === 0 ? (
              <tr className='bg-background dark:bg-dbackgroundPaper border-b'>
                <td colSpan={6} className='text-center py-4 text-textSecondary2 dark:text-dtextSecondary'>
                  Aún no se han realizado pedidos
                </td>
              </tr>
            ) :   
            orders.map((order) => (
              <tr
                key={order.id}
                className='bg-background dark:bg-dbackgroundPaper hover:bg-hoverLink dark:hover:bg-dhoverLink border-b transition duration-100 ease-in-out '
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-text dark:text-dtext'>
                  {order.id.split('-')[0]}
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {order.orderAddress?.firstName} {order.orderAddress?.lastName}
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {getFormattedDateTime(new Date(order.createdAt))}
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {formatCurrency(order.total)}
                </td>
                <td className='flex items-center text-sm font-light px-6 py-4 whitespace-nowrap'>
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className='text-green-700 dark:text-green-500' />
                      <span className='mx-2 text-green-700 dark:text-green-500 font-medium'>
                        Pago Realizado
                      </span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className='text-red-600 dark:text-red-500' />
                      <span className='mx-2 text-red-600 dark:text-red-500 font-medium'>
                        Pago Pendiente
                      </span>
                    </>
                  )}
                </td>
                <td className='text-sm font-light px-6 '>
                  <Link
                    href={`/orders/${order.id}`}
                    className='hover:underline text-blue-600 dark:text-blue-400'
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
