'use client'
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';

interface Props {
  title: string;
}

export const AuthButton = ({ title }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className={clsx('btn-primary font-semibold  w-full tracking-wider',{
        'bg-disabled': pending,
      })}
    >
      {title}
    </button>
  );
};
