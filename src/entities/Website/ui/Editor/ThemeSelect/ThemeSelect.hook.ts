'use client';

import { useCallback } from 'react';

import { useWebsiteStore, selectTheme, ThemeNames } from '@/entities/Website';
import { useUpdateTheme } from '@/entities/Website/api';

export const useThemeSelect = () => {
  const theme = useWebsiteStore(selectTheme);
  const { isLoading, updateTheme } = useUpdateTheme();

  const handleChange = useCallback(
    (newTheme: ThemeNames) => updateTheme(newTheme),
    [updateTheme]
  );

  return {
    theme: theme ?? 'White',
    handleChange,
    isLoading,
  };
};
