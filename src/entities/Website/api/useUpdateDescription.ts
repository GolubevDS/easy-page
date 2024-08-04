'use client';

import useSWRMutation from 'swr/mutation';
import { createClient } from '@/shared/lib/supabase/client';
import { useToast } from '@/shared/ui/use-toast';
import { useCallback } from 'react';

const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';

const updateDescriptionFetcher = async (
  _,
  { arg: description }: { arg: string }
) => {
  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  const { error } = await supabase
    .from('websites')
    .update({ description })
    .eq('id', data.user.id);

  if (error) {
    throw error;
  }
};

export const useUpdateDescription = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    UPDATE_DESCRIPTION,
    updateDescriptionFetcher
  );
  const { toast } = useToast();

  const updateDescription = useCallback(
    async (description: string) => {
      try {
        await trigger(description);
        toast({
          title: 'Success',
          description: 'Description updated successfully.',
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update description.',
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
    updateDescription,
  };
};
