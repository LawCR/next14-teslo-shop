import Link from "next/link";
import { CartProductList, CartSummary } from '@/features/cart';
import { Title } from "@/features/ui";

export default function CartPage() {

  return (
    <div className="flex justify-center items-center pb-16 md:pb-64">
      <div className="flex flex-col w-full md:w-[1000px] px-2 md:px-0">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 px-4 md:px-0">
          {/* Carrito */}
          <div className="flex flex-col">
            <span className="text-xl">Agregar más artículos</span>
            <Link 
              href="/"
              className="underline mb-5"
            >
              Continúa comprando
            </Link>
            <CartProductList />
          </div>

          <div className='block md:hidden w-full h-px bg-gray-200 mb-1' />

          {/* Summary */}
          <div className="md:bg-backgroundPaper md:dark:bg-dbackgroundPaper shadow-xl md:dark:border-t-2 dark:border-white h-fit md:p-8 rounded-xl">
            <h2 className="text-xl mb-2 font-semibold trackin">Resumen del pedido</h2>
            
            <CartSummary />

            <div className="mt-5 mb-2 w-full">
              <Link
                href='/checkout/address'
                className="flex btn-primary justify-center tracking-widest"
              >
                CONTINUAR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
