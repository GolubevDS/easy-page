import { DemoPhoneIframe } from '@/entities/Website';
import { createClient } from '@/shared/lib/supabase/server';
import { MockupPhone } from '@/shared/ui/mockup-phone';
import {
  BarChartIcon,
  GearIcon,
  HomeIcon,
  MagicWandIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.getUser();

  if (authError || !data?.user) {
    await redirect('/signin');
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link href='/' className='flex items-center gap-2 font-semibold'>
              <span className=''>Easy Page</span>
            </Link>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <Link
                href='#'
                className='text-primary bg-muted flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
              >
                <HomeIcon />
                Dashboard
              </Link>
              <Link
                href='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <MagicWandIcon />
                Style
              </Link>
              <Link
                href='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <BarChartIcon />
                Analytics
              </Link>
              <Link
                href='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <GearIcon />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <main className='py-4 px-8'>
        <div className='flex w-full gap-16 pr-12'>
          <div className='w-full grow-1 space-y-6'>{children}</div>
          <div className='w-96 relative'>
            <MockupPhone className='w-[393px] h-[736px] sticky top-4'>
              <DemoPhoneIframe />
            </MockupPhone>
          </div>
        </div>
      </main>
    </div>
  );
}
