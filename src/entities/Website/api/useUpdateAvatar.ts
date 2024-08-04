'use client';

import useSWRMutation from 'swr/mutation';
import { createClient } from '@/shared/lib/supabase/client';
import { useToast } from '@/shared/ui/use-toast';
import { getFileExtension } from '@/shared/lib/utils';
import { useCallback } from 'react';

const UPDATE_AVATAR = 'UPDATE_AVATAR';

async function updateAvatarFetcher(_, { arg: file }: { arg: File }) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw userError;
  }

  const filePath = `${user.id}/avatar.${getFileExtension(file.name)}`;
  const error = (
    await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })
  ).error;

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(
    filePath
    // { transform: { width: 62, height: 62, resize: 'contain' } }
  );

  const { error: updateError } = await supabase
    .from('websites')
    .update({ photo_url: `${data.publicUrl}?t=${Date.now()}` })
    .eq('id', user.id);

  if (updateError) {
    throw updateError;
  }
}

export function useUpdateAvatar() {
  const { trigger, error, isMutating } = useSWRMutation(
    UPDATE_AVATAR,
    updateAvatarFetcher
  );
  const { toast } = useToast();

  const updateAvatar = useCallback(
    async (file: File) => {
      try {
        await trigger(file);
        toast({
          title: 'Success',
          description: 'Avatar updated successfully.',
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update avatar.',
          variant: 'destructive',
          duration: 5000,
        });
      }
    },
    [toast, trigger]
  );

  return {
    error,
    isLoading: isMutating,
    updateAvatar,
  };
}
