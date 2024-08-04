'use client';

import { Input } from '@/shared/ui/input';
import { InputWithIcon } from '@/shared/ui/input-with-icon';
import { useLinksInputs } from './LinksInputs.hook';
import { getIconForLink } from './LinksInputs.utils';
import { Button } from '@/shared/ui/button';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Spinner } from '@/shared/ui/spinner';

export function LinksInputs() {
  const {
    links,
    newLink,
    isAddLoading,
    isDeleteLoading,
    handleNewLinkChange,
    handleAddLink,
    handleDeleteLink,
  } = useLinksInputs();

  return (
    <div className='space-y-2'>
      <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
        Links
      </p>
      <p className='text-[0.8rem] text-muted-foreground'>
        Add links to your social media profiles or any other websites
      </p>
      <div className='space-y-4'>
        <div className='flex w-full flex-col space-y-2'>
          {links.map((link) => (
            <div key={link} className='w-full flex gap-2 items-center'>
              <InputWithIcon
                className='grow'
                icon={getIconForLink(link)}
                id={link}
                name={link}
                type='text'
                value={link}
                readOnly
              />
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleDeleteLink(link)}
                disabled={isDeleteLoading}
              >
                <Cross1Icon className='h-4 w-4' />
              </Button>
            </div>
          ))}
          <div className='flex gap-4 items-center'>
            <Input
              id='newLink'
              name='newLink'
              type='text'
              value={newLink}
              onChange={handleNewLinkChange}
              placeholder='https://'
              disabled={isAddLoading}
            />
            <Button
              className='w-48'
              onClick={handleAddLink}
              disabled={isAddLoading}
            >
              {isAddLoading ? (
                <Spinner className='text-black mr-2' size='small' />
              ) : (
                'Add link'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
