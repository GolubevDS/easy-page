'use client';

import { useWebsiteStore, selectInitializeData } from '@/entities/Website';
import { useWebsiteSubscription } from '@/entities/Website/model/hooks/useWebsiteSubscription';
import { Editor } from '@/entities/Website/ui/Editor';
import { useEffect } from 'react';

export default function DashboardPage() {
  useWebsiteSubscription();
  const initializeWebsiteData = useWebsiteStore(selectInitializeData);

  useEffect(() => {
    initializeWebsiteData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <div
        data-orientation='horizontal'
        role='none'
        className='shrink-0 bg-border h-[1px] w-full'
      ></div>

      <Editor />
    </>
  );
}
