
import { auth } from '@/auth';
import { Title } from '@/features/ui';

export default async function ProfilePage() {

  const session = await auth()

  return (
    <div className='flex flex-col'>
      <Title title='Perfil' />
      <pre>
        {
          JSON.stringify(session?.user, null, 2)
        }
      </pre>
      <h3 className='text-4xl'>{session?.user.role}</h3>
    </div>
  );
}
