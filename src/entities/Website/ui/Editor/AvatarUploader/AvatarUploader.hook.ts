'use client';

import { useCallback, useEffect, useState } from 'react';
import { useWebsiteStore, selectPhotoUrl } from '@/entities/Website';
import { useUpdateAvatar } from '@/entities/Website/api';

export function useAvatarUploader() {
  const photoUrl = useWebsiteStore(selectPhotoUrl);
  const { updateAvatar, isLoading } = useUpdateAvatar();
  const [url, setUrl] = useState<string | null>(photoUrl ?? null);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        await updateAvatar(file);
      }
    },
    [updateAvatar]
  );

  useEffect(() => {
    if (photoUrl) setUrl(photoUrl);
  }, [photoUrl]);

  return { url, isUploading: isLoading, handleChange };
}
