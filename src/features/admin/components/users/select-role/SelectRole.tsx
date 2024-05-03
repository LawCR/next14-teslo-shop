"use client"
import { Role } from '@/features/auth'
import { adminUpdateUser } from '../../../actions/users/admin-update-user'
import toast from 'react-hot-toast'

interface Props {
  role: Role
  userId: string
}

export const SelectRole = ({ role, userId }: Props) => {

  const handleRoleChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
    const { ok, message } = await adminUpdateUser(userId, { role: e.target.value as Role })
    if (!ok) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  return (
    <select 
      className='text-sm w-full p-2 rounded border border-gray-200 outline-none bg-backgroundPaper dark:bg-dbackgroundPaper text-text dark:text-dtext' 
      value={role}
      onChange={handleRoleChange}
    >
      <option value="admin">Administrador</option>
      <option value="employee">Empleado</option>
      <option value="client">Cliente</option>
    </select>
  )
}
