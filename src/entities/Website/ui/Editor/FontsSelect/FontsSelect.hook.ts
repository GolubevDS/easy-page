'use client';

import { useCallback } from 'react';

import {
  useWebsiteStore,
  selectFont,
  Fonts,
  FONTS,
} from '@/entities/Website';
import { useUpdateFont } from '@/entities/Website/api';

export const useFontSelect = () => {
  const font = useWebsiteStore(selectFont);
  const { isLoading, updateFont } = useUpdateFont();

  const handleChange = useCallback(
    (newFont: Fonts) => updateFont(newFont),
    [updateFont]
  );

  return {
    font: (font ?? Object.keys(FONTS)[0]) as Fonts,
    handleChange,
    isLoading,
  };
};
