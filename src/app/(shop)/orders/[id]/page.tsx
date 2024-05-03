
import { auth } from '@/auth';
import { OrderProductList, OrderStatus, OrderSummary, getOrderById } from '@/features/order';
import { Title } from "@/features/ui";
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  }
}

export default async function OrderPage({ params }: Props) {

  const { id } = params
  const { ok, order } = await getOrderById(id)
  const session = await auth()

  if (!ok || !order) {
    notFound()
  }

  return (
    <div className="flex justify-center items-center pb-8 md:pb-64">
      <div className="flex flex-col w-full md:w-[1000px] px-2 md:px-0">
        <Title title={`Pedido #${id}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 px-4 md:px-0">
          {/* Carrito */}
          <div className="flex flex-col">
            <OrderStatus isPaid={order?.isPaid!} />
            <Link 
              href={session?.user.role == 'client' ? "/orders" : "/admin/orders"}
              className={`underline mb-5`}
            >
              {session?.user.role == 'client' ? 'Ver mis pedidos' : 'Ver todas las órdenes'}
            </Link>
            <OrderProductList items={order?.orderItems!} />
          </div>

          <div className="block md:hidden w-full h-px bg-gray-200 mb-1" />

          {/* Summary */}
          <OrderSummary order={order} />
        </div>
      </div>
    </div>
  );
}
