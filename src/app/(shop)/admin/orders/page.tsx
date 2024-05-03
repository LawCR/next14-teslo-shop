export const revalidate = 0;

import { OrdersTable, adminGetOrders } from '@/features/admin';
import { Pagination, Title } from '@/features/ui';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, orders = [], totalPages } = await adminGetOrders({ currentPage: page });

  if (!ok) {
    redirect('/');
  }

  return (
    <div>
      <Title title='Gestión de órdenes' />

      <div className='px-4 md:px-0'>
        <OrdersTable orders={orders} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}