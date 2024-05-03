export const revalidate = 0;

import { UsersTable, adminGetUsers } from '@/features/admin';
import { Pagination, Title } from '@/features/ui';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, users = [], totalPages } = await adminGetUsers({ currentPage: page });

  if (!ok) {
    redirect('/');
  }

  return (
    <div>
      <Title title='Gestión de usuarios' />

      <div className='px-4 md:px-0'>
        <UsersTable users={users} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}