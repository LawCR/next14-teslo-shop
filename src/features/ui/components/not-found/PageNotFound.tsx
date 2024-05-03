import { titleFont } from '@/config/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  title?: string,
  to?: string,
}

export const PageNotFound = ({ title = 'Página no encontrada', to = '/' }: Props) => {
  return (
    <div className='flex flex-col-reverse md:flex-row h-[calc(100vh-88px)] w-full justify-center items-center align-middle z-0'>
      <div className='text-center px-5 mx-5'>
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className='font-semibold text-xl'>Whoops! {title}</p>
        <p className='font-light'>
          <span>Puedes regresar al </span>
          <Link
            href={to}
            className='font-normal hover:underline transition-all text-blue-500 hover:text-blue-400'
          >
            Inicio
          </Link>
        </p>
      </div>

      <div className='px-5 mx-5'>
        <Image
          src='/imgs/starman_750x750.png'
          alt='Starman'
          className='p-0 md:p-5  h-[180px] w-[180px] md:h-[400px] md:w-[400px] lg:h-[550px] lg:w-[550px]'
          width={550}
          height={550}
        />
      </div>
    </div>
  )
}
