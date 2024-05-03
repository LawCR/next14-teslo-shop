'use client';
import { EMAIL_REGEX, sleep } from '@/helpers';
import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login, registerUser } from '../../actions/auth-action';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    setIsLoading(true)
    await sleep(3)
    const { firstName, lastName, email, password } = data
    const name = `${firstName} ${lastName}`
    const { message, ok }  = await registerUser({ name, email, password })
    if (ok) {
      toast.success(message)
      await login(email.toLowerCase(), password)
      window.location.replace('/')
    } else {
      toast.error(message)
    }
    setIsLoading(false)
  }

  return (
    <form className='w-full sm:w-[450px]' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label className='block text-gray-600'>Nombres</label>
        <input
          {...register("firstName", { required: '* Este campo es requerido' })}
          type='text'
          id='firstName'
          className={clsx('w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500', {
            'input-error': !!errors.firstName
          })}
          autoComplete='off'
          autoFocus
          aria-invalid={!!errors.firstName}
        />
        {errors.firstName && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.firstName.message}</p>}
      </div>

      <div className='mb-4'>
        <label className='block text-gray-600'>Apellidos</label>
        <input
          type='text'
          id='lastName'
          className={clsx('w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500', {
            'input-error': !!errors.lastName
          })}
          autoComplete='off'
          {...register("lastName", { required: '* Este campo es requerido' })}
        />
        {errors.lastName && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.lastName.message}</p>}
      </div>

      <div className='mb-4'>
        <label className='block text-gray-600'>Correo electrónico</label>
        <input
          type='email'
          id='email'
          className={clsx('w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500', {
            'input-error': !!errors.email
          })}
          autoComplete='off'
          aria-invalid={!!errors.email}
          {...register("email", { 
            required: { message: '* Este campo es requerido', value: true },
            pattern: { message: '* El correo electrónico no es válido', value: EMAIL_REGEX}
          })} // Email validation
        />
        {errors.email && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.email.message}</p>}
      </div>

      <div className='mb-4 relative'>
        <label className='block text-gray-600'>Contraseña</label>
        <input
          type={isEyeOpen ? "text" : "password"}

          id='password'
          className={clsx('w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500', {
            'input-error': !!errors.password
          })}
          autoComplete='off'
          // 6 caracteres minimo y una Letra mayúscula, una minúscula y un número
          {...register("password", { 
            required: { message: '* Este campo es requerido', value: true },
            pattern: { message: '* La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una minúscula y un número',

            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/}
          })}
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
        {errors.password && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.password.message}</p>}
      </div>
      <button
        type='submit'
        className='bg-blue-500 bg-disabled hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full tracking-wider mt-2'
        disabled={isLoading}
        aria-disabled={isLoading}
      >
        REGISTRAR
      </button>
      <div className='flex items-center my-3'>
        <div className='flex-1 border-t border-gray-400 w-56' />
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-400' />
      </div>
      <Link
        href='/auth/login'
        className={clsx('mt-1 block btn-white text-center tracking-wider  w-full', {
          'bg-disabled pointer-events-none': isLoading,
        })}
        aria-disabled={isLoading}
      >
        INICIAR SESIÓN
      </Link>
    </form>
  );
};
