import { titleFont } from '@/config/fonts';
import { RegisterForm } from '@/features/auth';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="bg-gray-100 grid grid-cols-1 lg:grid-cols-2 h-screen ">
      <div className="col-span-1 h-full hidden lg:block">
        <Image 
          src={'/imgs/react-wallpaper.jpg'} 
          alt="Placeholder Image" 
          className="object-cover w-full h-full" 
          width={1920}
          height={1080}
          priority
        />
      </div>
      <div className="col-span-1  h-full flex flex-col justify-center items-center py-6">
        <h1 className={ `${ titleFont.className } text-2xl font-semibold mb-4` }>Crear Cuenta</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
