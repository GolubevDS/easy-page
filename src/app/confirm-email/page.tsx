'use client';

import { Button } from '@/shared/ui/button';
import { ArrowRightIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center p-4'>
      <EnvelopeClosedIcon className='w-12 h-12' />
      <h1 className='text-2xl text-center mt-6'>Check your email</h1>
      <p className='mt-2 text-sm text-muted-foreground text-center'>
        We just sent verification link to <br /> {email}
      </p>
      <Button className='mt-6'>
        Go to login <ArrowRightIcon className='ml-2' />
      </Button>
    </main>
  );
}
