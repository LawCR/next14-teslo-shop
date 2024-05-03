import React from 'react'

interface Props {
  quantity?: number
}

export const ButtonsSkeleton = ({ quantity = 1 }: Props) => {

  const buttons = Array.from({ length: quantity }, (_, i) => i)

  return (
    <div className='animate-pulse flex flex-col gap-3'>
      {
        buttons.map((_, index) => (
          <div key={`button-skeleton-${index}`} className='w-full h-11 bg-gray-200 dark:bg-gray-400 rounded' />
        ))
      }
    </div>
  )
}
