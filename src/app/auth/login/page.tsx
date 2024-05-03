import Image from 'next/image';
import { titleFont } from '@/config/fonts';
import { LoginForm } from '@/features/auth';

export default function LoginPage () {
  return (
    <div className="bg-gray-100 grid lg:grid-cols-2">
      <div className="h-screen hidden lg:block">
        <Image 
          src={'/imgs/react-wallpaper.jpg'} 
          alt="Placeholder Image" 
          className="object-cover w-full h-full" 
          width={1920}
          height={1080}
          priority
        />
      </div>
      <div className="flex flex-col justify-center items-center sm:px-12 p-8 w-full h-screen">
        <h1 className={ `${ titleFont.className } text-2xl font-semibold mb-4` }>Iniciar Sesión</h1>
        <LoginForm />
      </div>
    </div>
  );
}