import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import { IoSearchOutline } from 'react-icons/io5'
import { TopMenuLink, TopMenuButtonCart, TopMenuButtonMenu, TopMenuDarkModeToggle } from './'

export const TopMenu = () => {
  return (
    <nav className='flex px-5 h-[56px] justify-between items-center w-full z-20'>
      {/* Logo */}
      <div>
        <Link
          href="/"
        >
          <span className={`${titleFont.className} antialiased font-bold tracking-widest`}>TESLO&nbsp;</span>
          <span>| &nbsp;SHOP</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden md:block'>
        <TopMenuLink title='HOMBRES' href='/gender/men' />
        <TopMenuLink title='MUJERES' href='/gender/women' />
        <TopMenuLink title='NIÑOS' href='/gender/kids' />
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center gap-1 md:gap-[1px]'>
        <Link
          // href='/search'
          href='/'
          className='btn-link'
          title='Buscar productos'
          id='search-link'
        >
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        
        <TopMenuButtonCart />
        <TopMenuDarkModeToggle />
        <TopMenuButtonMenu />
      </div>
    </nav>
  )
}
