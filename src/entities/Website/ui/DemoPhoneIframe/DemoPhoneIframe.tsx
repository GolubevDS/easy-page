'use client';

import { Spinner } from '@/shared/ui/spinner';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  selectData,
  selectIsLoading,
  useWebsiteStore,
} from '../../model/store/useWebsiteStore';

const DemoPhoneIframe = () => {
  const websiteData = useWebsiteStore(selectData);
  const websiteDataIsLoading = useWebsiteStore(selectIsLoading);
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState('http://localhost:3000/demo');

  useEffect(() => {
    if (websiteData) {
      setIsLoading(true);
      setSrc('http://localhost:3000/demo?t=' + new Date().getTime());
    }
  }, [websiteData]);

  return (
    <div className='h-full w-full'>
      {websiteDataIsLoading || isLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <Spinner />
        </div>
      ) : null}
      <iframe
        onLoad={() => setIsLoading(false)}
        src={src}
        title='Easy Page'
        className={clsx(
          'h-full w-full transition-opacity',
          websiteDataIsLoading || isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  );
};

export default DemoPhoneIframe;
