'use client';

import useSWRMutation from 'swr/mutation';
import { createClient } from '@/shared/lib/supabase/client';
import { useToast } from '@/shared/ui/use-toast';
import { useCallback } from 'react';
import { Fonts } from '../model/types';

const UPDATE_FONT = 'UPDATE_FONT';

const updateFontFetcher = async (_, { arg: font }: { arg: Fonts }) => {
  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  const { error } = await supabase
    .from('websites')
    .update({ font })
    .eq('id', data.user.id);

  if (error) {
    throw error;
  }
};

export const useUpdateFont = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    UPDATE_FONT,
    updateFontFetcher
  );
  const { toast } = useToast();

  const updateFont = useCallback(
    async (font: Fonts) => {
      try {
        await trigger(font);
        toast({
          title: 'Success',
          description: 'Font updated successfully.',
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update font.',
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
    updateFont,
  };
};
