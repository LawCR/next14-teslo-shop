import { getFormattedDateTime } from '@/helpers/formats';
import Link from 'next/link';
import React from 'react'
import { User } from '../../../interfaces/users/users.interface';
import { SelectRole } from '../select-role/SelectRole';
import Image from 'next/image';

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <div className='mb-10 w-full overflow-x-auto'>
      <table className='min-w-full'>
        <thead className='bg-gray-200 dark:bg-dhoverLink border-b'>
          <tr>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Correo
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Nombre Completo
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Fecha de Registro
            </th>
            <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Rol
            </th>
            {/* <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Estado
            </th>
             */}
             <th
              scope='col'
              className='text-sm font-medium text-text dark:text-dtext px-6 py-4 text-left'
            >
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {
            users.length === 0 ? (
              <tr className='bg-background dark:bg-dbackgroundPaper border-b'>
                <td colSpan={6} className='text-center py-4 text-textSecondary2 dark:text-dtextSecondary'>
                  No hay usuarios registrados aún
                </td>
              </tr>
            ) :   
            users.map((user) => (
              <tr
                key={user.id}
                className='bg-background dark:bg-dbackgroundPaper hover:bg-hoverLink dark:hover:bg-dhoverLink border-b transition duration-100 ease-in-out '
              >
                <td className='pl-3 whitespace-nowrap text-sm font-medium text-text dark:text-dtext'>
                  <Image
                    alt="user 1"
                    src={user.image || '/imgs/no-image.jpg'}
                    width={40}
                    height={40}
                    className="relative inline-block h-10 w-10 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                  />
                </td>
                <td className='text-sm text-text dark:text-dtext font-medium px-6 py-4 whitespace-nowrap'>
                  {user?.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-light text-text dark:text-dtext'>
                  {user.email}
                </td>
                <td className='text-sm text-text dark:text-dtext font-light px-6 py-4 whitespace-nowrap'>
                  {getFormattedDateTime(new Date(user.createdAt))}
                </td>
                <td className='flex min-w-[180px] items-center text-sm font-light px-6 py-4 whitespace-nowrap'>
                  <SelectRole userId={user.id} role={user.role} />
                </td>
                <td className='text-sm min-w-[120px] font-light px-6 '>
                  <Link
                    href={`/orders/${user.id}`}
                    className='hover:underline text-blue-600 dark:text-blue-400'
                  >
                    Ver usuario
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
