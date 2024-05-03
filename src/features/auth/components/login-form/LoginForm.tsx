'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { authenticate } from '../../actions/auth-action';
import { AuthButton } from '../auth-button/AuthButton';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCloseCircleOutline, IoEyeOffOutline, IoEyeOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { useSearchParams } from 'next/navigation';
import { GoogleLoginButton } from '../google-login-button/GoogleLoginButton';

export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const params = useSearchParams();
  const returnTo = params.get('callbackUrl') || '/';

  useEffect(() => {
    if (returnTo !== '/') {
      toast.success('Debes iniciar sesión para continuar.')
    }
  }, [returnTo])

  useEffect(() => {
    if (state === 'success') {
      window.location.replace(returnTo)
      toast.success('Inicio de sesión exitoso.')
    }  
    // if (state && state !== 'success') {
    //   toast.error('Credenciales inválidas.')
    // }
  }, [state, returnTo])

  // if (state && typeof state === 'string') {
  //   toast.error(state)
  // }

  return (
    <form action={dispatch} className='w-full sm:w-[450px]'>
      <div className='mb-4'>
        <label className='block text-gray-600'>Correo electrónico</label>
        <input
          type='email'
          id='email'
          name='email'
          className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
          // autoComplete='off'
        />
      </div>

      <div className='mb-4 relative '>
        <label className='block text-gray-600'>Contraseña</label>
        <input
          type={isEyeOpen ? "text" : "password"}
          id='password'
          name='password'
          className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 pr-10'
          // autoComplete='off'
        />
        <button
          type="button"
          className="absolute bottom-3 right-0 px-3 flex items-center justify-center bg-transparent"
          onClick={() => setIsEyeOpen((prev) => !prev)}
          aria-label={
            isEyeOpen ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {isEyeOpen ? (
            <IoEyeOutline size={20} className="text-blue-600" />
          ) : (
            <IoEyeOffOutline size={20} className="text-gray-400" />
          )}
        </button>
      </div>
      <div className='mb-4 flex items-center'>
        <input
          type='checkbox'
          id='remember'
          name='remember'
          className='text-blue-500'
        />
        <label className='text-gray-600 ml-2'>Recuérdame</label>
      </div>
      <div className='mb-4 text-blue-500'>
        <a href='#' className='hover:underline'>
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      {(state && state !== 'success') && (
        <div
          className="flex items-center space-x-1 mb-4"
          aria-live="polite"
          aria-atomic="true"
        >
          <IoCloseCircleOutline className="h-6 w-6 text-red-500 fade-in" />
          <p className="fade-in text-sm text-red-500">{state}</p>
        </div>
      )}
      
      <AuthButton title='INGRESAR' />
      <div className='flex items-center my-3'>
        <div className='flex-1 border-t border-gray-400 w-56' />
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-400' />
      </div>
      <GoogleLoginButton />
      <Link
        href='/auth/new-account'
        className='block btn-white text-center tracking-wider  w-full'
      >
        CREAR UNA CUENTA
      </Link>
    </form>
  );
};
