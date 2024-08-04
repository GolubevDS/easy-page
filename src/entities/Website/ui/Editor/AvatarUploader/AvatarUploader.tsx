'use client';

import { Avatar } from '@/shared/ui/avatar';
import { cn } from '@/shared/lib/utils';
import { CameraIcon } from 'lucide-react';
import { useAvatarUploader } from './AvatarUploader.hook';
import Image from 'next/image';

export const AvatarUploader = () => {
  const { url, isUploading, handleChange } = useAvatarUploader();

  return (
    <div className='relative inline-block'>
      <input
        type='file'
        id='avatar'
        className='hidden'
        accept='image/*'
        onChange={handleChange}
      />
      <label htmlFor='avatar' className='cursor-pointer'>
        <Avatar className={cn('avatar h-16 w-16', isUploading && 'opacity-50')}>
          {url ? (
            <Image width={64} height={64} src={url} alt='User Avatar' />
          ) : null}
          <div className='flex items-center justify-center absolute top-0 left-0 w-full h-full z-10 bg-black/75 transition-opacity opacity-50 hover:opacity-100'>
            <CameraIcon className='h-8 w-8' />
          </div>
        </Avatar>
      </label>
    </div>
  );
};
