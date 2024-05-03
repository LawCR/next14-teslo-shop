'use client';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { Country } from '../../interfaces/country.interface';
import { useAddressStore } from '../../address-store';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { setUserAddress, deleteUserAddress, Address } from '@/features/checkout';
import { useRouter } from 'next/navigation';

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  countryId: string;
  department: string;
  province: string;
  district: string;
  phone: string;
  rememberAddress: boolean;
};

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const setAddress = useAddressStore(state => state.setAddress);
  const address = useAddressStore(state => state.address);
  const { data: session } = useSession({
    required: true
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...userStoredAddress,
      rememberAddress: false,
    },
  });

  // console.log(watch())

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, [address, reset])

  const onSubmit = async(data: FormInputs) => {
    setIsLoading(true)
    const { rememberAddress, ...restAddress } = data
    setAddress(restAddress);

    if (rememberAddress) {
      const { ok, message } = await setUserAddress(restAddress, session?.user.id!);
      if (ok) {
        toast.success(message);
        router.push('/checkout');
      }
      else toast.error(message);
    } else {
      const { ok, message } = await deleteUserAddress(session?.user.id!)
      if (ok) {
        toast.success(message);
        router.push('/checkout');
      }
      else toast.error(message);
    }
    setIsLoading(false)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 px-4 md:px-0'
    >
      <div className='flex flex-col mb-2'>
        <span>Nombres</span>
        <input
          type='text'
          className='input-form '
          {...register('firstName', { required: "Este campo es requerido" })}
        />
        {errors.firstName && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.firstName.message}</p>}
        
      </div>

      <div className='flex flex-col mb-2'>
        <span>Apellidos</span>
        <input
          type='text'
          className='input-form'
          {...register('lastName', { required: "Este campo es requerido" })}
        />
        {errors.lastName && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.lastName.message}</p>}
      </div>

      <div className='flex flex-col mb-2'>
        <span>Dirección</span>
        <input
          type='text'
          className='input-form'
          {...register('address', { required: "Este campo es requerido" })}
        />
        {errors.address && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.address.message}</p>}
      </div>

      <div className='flex flex-col mb-2'>
        <span>Dirección 2 (opcional)</span>
        <input
          type='text'
          className='input-form'
          {...register('address2')}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Código postal</span>
        <input
          type='text'
          className='input-form'
          {...register('postalCode', { required: "Este campo es requerido" })}
        />
        {errors.postalCode && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.postalCode.message}</p>}
      </div>
      <div className='flex flex-col mb-2'>
        <span>País</span>
        <select
          className='input-form'
          {...register('countryId', { required: "Este campo es requerido" })}
        >
          <option value=''>[ Seleccione ]</option>
          {
            countries.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))
          }
        </select>
        {errors.countryId && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.countryId.message}</p>}
      </div>
      <div className='flex flex-col mb-2'>
        <span>Departamento</span>
        <input
          type='text'
          className='input-form'
          {...register('department', { required: "Este campo es requerido" })}
        />
        {errors.department && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.department.message}</p>}
      </div>
      <div className='flex flex-col mb-2'>
        <span>Provincia</span>
        <input
          type='text'
          className='input-form'
          {...register('province', { required: "Este campo es requerido" })}
        />
        {errors.province && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.province.message}</p>}
      </div>
      <div className='flex flex-col mb-2'>
        <span>Distrito</span>
        <input
          type='text'
          className='input-form'
          {...register('district', { required: "Este campo es requerido" })}
        />
        {errors.district && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.district.message}</p>}
      </div>
      <div className='flex flex-col mb-2'>
        <span>Teléfono</span>
        <input
          type='text'
          className='input-form'
          {...register('phone', { required: "Este campo es requerido", pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' }})}
        />
        {errors.phone && <p role="alert" className='text-sm text-red-600 mt-1'>{errors.phone.message}</p>}
      </div>

      <div className='flex flex-col mb-2 sm:mt-1'>
        <div className='inline-flex items-center mb-8'>
          <label
            className='relative flex cursor-pointer items-center rounded-full p-3'
            htmlFor='checkbox'
          >
            <input
              type='checkbox'
              className='border-gray-500  peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10'
              id='checkbox'
              // checked
              {...register('rememberAddress')}
            />
            <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                viewBox='0 0 20 20'
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </label>
          <span>Recordar dirección</span>
        </div>
        <button
          type='submit'
          className={clsx(
            'btn-primary bg-disabled flex w-full sm:w-1/2 justify-center'
          )}
          // disabled={!isValid}
          disabled={isLoading}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
