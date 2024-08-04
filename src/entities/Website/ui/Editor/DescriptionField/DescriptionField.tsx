'use client';

import { Textarea } from '@/shared/ui/textarea';

import { DescriptionMarkdownGuide } from './DescriptionMarkdownGuide';
import { useDescriptionField } from './DescriptionField.hook';

export const DescriptionField = () => {
  const { description, handleChange, isLoading } = useDescriptionField();

  return (
    <div className='relative'>
      <Textarea
        rows={6}
        placeholder='Tell us a little bit about yourself'
        id='description'
        aria-describedby='website-description'
        aria-invalid='false'
        name='description'
        defaultValue={description}
        onChange={handleChange}
        disabled={isLoading}
      />
      <DescriptionMarkdownGuide />
    </div>
  );
};
