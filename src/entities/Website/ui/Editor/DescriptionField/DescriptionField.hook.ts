'use client';

import { ChangeEvent, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useWebsiteStore, selectDescription } from '@/entities/Website';
import { useUpdateDescription } from '@/entities/Website/api';

export const useDescriptionField = () => {
  const description = useWebsiteStore(selectDescription);
  const debounced = useDebouncedCallback(
    (debouncedDescription) => updateDescription(debouncedDescription),
    5000
  );
  const { isLoading, updateDescription } = useUpdateDescription();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => debounced(e.target.value),
    [debounced]
  );

  return { description: description ?? '', handleChange, isLoading };
};
