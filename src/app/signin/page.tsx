'use client';

import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { reportError } from '@/shared/lib/utils';
import { User } from '@supabase/supabase-js';
// import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { navigate } from './actions';

export default function SignIn() {
  // const t = useTranslations('SignUp');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        body: new FormData(event.currentTarget),
      });
      const { email }: User = await response.json();
      if (email) await navigate(email);
    } catch (error) {
      setError(reportError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='w-full h-screen flex items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm w-96'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' name='email' placeholder='m@example.com' required />
              </div>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Creating account...' : 'Create an account'}
              </Button>
              {error ? <div className='text-red-500 text-center mt-2'>{error}</div> : null}

              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t'></span>
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>Or</span>
                </div>
              </div>

              <Button variant='outline' className='w-full'>
                Sign up with Google
              </Button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/sign-in' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
