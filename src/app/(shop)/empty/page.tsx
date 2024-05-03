import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-88px)]">
      <IoCartOutline size={80} className="mx-5 text-gray-300" />

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">
          Tu carrito está vacío
        </h1>

        <Link
          href="/"
          className="text-blue-500 mt-2 text-3xl hover:underline"
        >Regresar</Link>
      </div>
    </div>
  );
}
