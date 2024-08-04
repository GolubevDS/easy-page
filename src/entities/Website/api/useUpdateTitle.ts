'use client';

import useSWRMutation from 'swr/mutation';
import { createClient } from '@/shared/lib/supabase/client';
import { useToast } from '@/shared/ui/use-toast';
import { useCallback } from 'react';

const UPDATE_TITLE = 'UPDATE_TITLE';

const updateTitleFetcher = async (_, { arg: title }: { arg: string }) => {
  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  const { error } = await supabase
    .from('websites')
    .update({ title })
    .eq('id', data.user.id);

  if (error) {
    throw error;
  }
};

export const useUpdateTitle = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    UPDATE_TITLE,
    updateTitleFetcher
  );
  const { toast } = useToast();

  const updateTitle = useCallback(
    async (title: string) => {
      try {
        await trigger(title);
        toast({
          title: 'Success',
          description: 'Title updated successfully.',
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update title.',
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
    updateTitle,
  };
};
