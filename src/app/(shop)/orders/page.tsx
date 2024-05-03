export const revalidate = 0;

import { OrdersTable } from '@/features/admin';
import { getOrdersByUser } from '@/features/order';
import { Pagination, Title } from '@/features/ui';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function OrdersPage({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, orders, totalPages } = await getOrdersByUser({ currentPage: page });

  if (!ok) {
    redirect('/auth/login');
  }

  // console.log(JSON.stringify(orders, null, 2));

  return (
    <div className='px-4 md:px-0'>
      <Title title='Órdenes' />

      <OrdersTable orders={orders} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
