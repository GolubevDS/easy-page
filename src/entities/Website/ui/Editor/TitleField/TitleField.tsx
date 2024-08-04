'use client';

import { Input } from '@/shared/ui/input';

import { useTitleField } from './TitleField.hook';

export const TitleField = () => {
  const { title, handleChange, isLoading } = useTitleField();

  return (
    <Input
      className='input'
      placeholder='This is your public display name.'
      id='title'
      aria-describedby='website-title'
      aria-invalid='false'
      name='title'
      defaultValue={title}
      onChange={handleChange}
      disabled={isLoading}
    />
  );
};
