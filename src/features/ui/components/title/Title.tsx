import { titleFont } from '@/config/fonts';
import React from 'react'

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({title, subtitle, className}: Props) => {
  return (
    <div className={`mt-0 md:mt-3 ${className} uppercase px-4 md:px-0`}>
      <h1 className={`${titleFont.className} antialiased text-2xl font-semibold my-6 md:my-8 `}>
        {title}
      </h1>
      {
        subtitle && (
          <h2 className='text-base mb-10 font-base'>{subtitle}</h2>
        )
      }
    </div>
  )
}
