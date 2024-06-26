import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function SignUp() {
  // const t = useTranslations('SignUp');

  return (
    <main className='w-full h-screen flex items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm w-96'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' />
            </div>
            <Button type='submit' className='w-full'>
              Create an account
            </Button>
            <Button variant='outline' className='w-full'>
              Sign up with Google
            </Button>
          </div>
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
