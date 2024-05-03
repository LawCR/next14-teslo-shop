import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex w-full justify-between sm:justify-center text-xs h-8 px-3'>
      <Link 
        href='/'
        className='tracking-wide sm:tracking-widest'
      >
        <span className={`${titleFont.className} antialiased font-bold`}>TESLO&nbsp;</span>
        <span>| &nbsp;SHOP </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <div>
        <Link
          href='/'
          className='mx-2 sm:mx-4'
        >
          Privacidad y legal
        </Link>
        <Link
          href='/'
          className='mx-2 sm:mx-4'
        >
          Ubicaciones
        </Link>
      </div>
    </div>
  )
}
