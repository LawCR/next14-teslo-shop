import Link from "next/link";
import { CheckoutProductList, PlaceOrder } from '@/features/checkout';
import { Title } from "@/features/ui";


export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center pb-8 md:pb-64">
      <div className="flex flex-col w-full md:w-[1000px] px-2 md:px-0">
        <Title title="Verificar Pedido" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 px-4 md:px-0">
          {/* Carrito */}
          <div className="flex flex-col">
            <span className="text-xl">Ajustar artículos</span>
            <Link 
              href="/cart"
              className="underline mb-5"
            >
              Editar carrito
            </Link>
            <CheckoutProductList />
          </div>

          <div className='block md:hidden w-full h-px bg-gray-200 mb-1' />

          {/* Summary */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
