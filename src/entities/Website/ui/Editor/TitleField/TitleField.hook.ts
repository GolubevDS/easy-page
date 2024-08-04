import { ChangeEvent, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useWebsiteStore, selectTitle } from '@/entities/Website';
import { useUpdateTitle } from '@/entities/Website/api';

export const useTitleField = () => {
  const title = useWebsiteStore(selectTitle);
  const { isLoading, updateTitle } = useUpdateTitle();
  const debounced = useDebouncedCallback(
    (debouncedTitle) => updateTitle(debouncedTitle),
    5000
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => debounced(e.target.value),
    [debounced]
  );

  return { title: title ?? '', handleChange, isLoading };
};
