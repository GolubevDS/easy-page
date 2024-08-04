'use client';

import { Label } from '@/shared/ui/label';

import { TitleField } from './TitleField';
import { AvatarUploader } from './AvatarUploader';
import { DescriptionField } from './DescriptionField';
import { LinksInputs } from './LinksInputs';
import {
  selectIsLoading,
  useWebsiteStore,
} from '../../model/store/useWebsiteStore';
import { Spinner } from '@/shared/ui/spinner';
import { FontsSelect } from './FontsSelect';
import { ThemeSelect } from './ThemeSelect';
import { SlateEditor } from '@/widgets/MDXEditor';

export function Editor() {
  const isLoading = useWebsiteStore(selectIsLoading);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center gap-2 h-[calc(100%-89px)]'>
        <Spinner size='small' />
        <p className='text-md'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <AvatarUploader />
        <div className='grow'>
          <Label
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            htmlFor='title'
          >
            Title
          </Label>
          <TitleField />
        </div>
      </div>
      <div className='grow'>
        <Label
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          htmlFor='title'
        >
          Description
        </Label>
        <DescriptionField />
      </div>
      <div className='flex gap-4'>
        <div className='w-full'>
          <Label
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            htmlFor='title'
          >
            Fonts
          </Label>
          <FontsSelect />
        </div>
        <div className='w-full'>
          <Label
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            htmlFor='title'
          >
            Themes
          </Label>
          <ThemeSelect />
        </div>
      </div>
      <hr />
      <LinksInputs />
      <SlateEditor />
    </div>
  );
}
