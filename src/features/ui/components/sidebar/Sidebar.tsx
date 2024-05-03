"use client"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import { SidebarMenuItem } from './SidebarMenuItem';
import { useUIStore } from '../../store/ui-store';
import clsx from 'clsx';
import { AUTH_CONSTANTS, logout } from '@/features/auth';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const Sidebar = () => {

  const isSidebarOpen = useUIStore(state => state.isSidebarOpen)
  const onCloseMenu = useUIStore(state => state.closeSidebar)

  const router = useRouter()
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const userRole = session?.user?.role

  return (
    <div className=''>
      {
        isSidebarOpen && (
          <>
            {/* Background Black */}
            <div 
              className='fixed top-0 left-0 w-screen h-screen z-20 bg-black dark:bg-gray-700 opacity-30' 
            />
            {/* Blur */}
            <div 
              onClick={onCloseMenu} 
              className='fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm' 
            />
          </>
        )
      }

      {/* Sidemenu */}
      <nav 
        className={
          clsx('fixed py-5 px-8 right-0 top-0 w-full sm:w-[414px] h-screen bg-background dark:bg-dbackground z-50 shadow-2xl transform transition-all duration-300 bo',
            {
              "translate-x-full": !isSidebarOpen,
            }
          )
        }
      >
        <IoCloseOutline 
          size={36}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={onCloseMenu}
        />

        {/* Search Input */}
        <div className='relative mt-14'>
          <IoSearchOutline size={21} className='absolute top-[9.8px] left-2 text-gray-400 dark:text-dtextSecondary' />
          <input 
            type="text"
            placeholder='Buscar productos' 
            className='w-full bg-gray-50 rounded pl-9 py-2 pr-5 border-b-2  border-gray-200 focus:outline-none focus:border-blue-500 text-gray-600 dark:text-dtext dark:bg-dhoverLink'
          />
        </div>

        {/* Menu */}
        {
          isAuthenticated && (
            <>
              <SidebarMenuItem onClick={onCloseMenu} href='/profile' title='Perfil' icon={<IoPersonOutline size={24}  />} isLink />
              <SidebarMenuItem onClick={onCloseMenu} href='/orders' title='Mis Ordenes' icon={<IoTicketOutline size={24}  />} isLink />
              {/* {
                ['client'].includes(userRole || 'loading') && (
                  <>
                    <SidebarMenuItem onClick={onCloseMenu} href='/orders' title='Mis Ordenes' icon={<IoTicketOutline size={24}  />} isLink />
                  </>
                )
              } */}
              <SidebarMenuItem 
                onClick={() => {
                  onCloseMenu()
                  logout()
                }} 
                href='/' 
                title='Salir' 
                icon={<IoLogOutOutline size={24} />} 
              />
            </>
          )
        }
        {
          !isAuthenticated && (
            <SidebarMenuItem 
              onClick={() => {
                onCloseMenu()
                router.push('/auth/login')
              }} 
              href='/auth/login' 
              title='Ingresar' 
              icon={<IoLogInOutline size={24}  />} 
            />
          ) 
        }
        
        {/* Admin */}

        {
          [AUTH_CONSTANTS.ROLES.ADMIN, AUTH_CONSTANTS.ROLES.EMPLOYEE].includes(userRole!) && (
            <>
              <div className='w-full h-px bg-gray-200 my-6' />
              <SidebarMenuItem onClick={onCloseMenu} href='/admin/orders' title='Ordenes' icon={<IoTicketOutline size={24}  />} isLink />
            </>
          )
        }
        {
          [AUTH_CONSTANTS.ROLES.ADMIN].includes(userRole!) && (
            <>
              <SidebarMenuItem onClick={onCloseMenu} href='/admin/products' title='Productos' icon={<IoShirtOutline size={24}  />} isLink />
              <SidebarMenuItem onClick={onCloseMenu} href='/admin/users' title='Usuarios' icon={<IoPeopleOutline size={24}  />} isLink />
            </>
          )
        }
        
      </nav>
    </div>
  )
}
