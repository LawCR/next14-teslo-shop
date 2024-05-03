"use client"
import clsx from 'clsx'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

interface Props {
  href: string
  title: string
}

export const TopMenuLink = ({ href, title }: Props) => {

  const params = useParams()

  return (
    <Link
      href={href}
      className={clsx('m-2 py-2 px-3 rounded-md transition-all text-textSecondary hover:text-text dark:hover:text-dtext dark:text-dtextSecondary hover:bg-gray-100 dark:hover:bg-dhoverLink tracking-widest', {
        'text-text dark:text-dtext bg-gray-200 dark:bg-dhoverLink': params.gender === href.split('/')[2]
      })}
    >{title}</Link>
  )
}
