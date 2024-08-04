'use client';

import useSWRMutation from 'swr/mutation';
import { createClient } from '@/shared/lib/supabase/client';
import { useToast } from '@/shared/ui/use-toast';
import { useCallback } from 'react';
import { ThemeNames } from '../model/types';

const UPDATE_THEME = 'UPDATE_THEME';

const updateThemeFetcher = async (_, { arg: theme }: { arg: ThemeNames }) => {
  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  const { error } = await supabase
    .from('websites')
    .update({ theme })
    .eq('id', data.user.id);

  if (error) {
    throw error;
  }
};

export const useUpdateTheme = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    UPDATE_THEME,
    updateThemeFetcher
  );
  const { toast } = useToast();

  const updateTheme = useCallback(
    async (theme: ThemeNames) => {
      try {
        await trigger(theme);
        toast({
          title: 'Success',
          description: 'Theme updated successfully.',
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update theme.',
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
    updateTheme,
  };
};
