import useSWRMutation from 'swr/mutation';
import { createClient } from '@/shared/lib/supabase/client';
import { useToast } from '@/shared/ui/use-toast';
import { useCallback } from 'react';

const ADD_LINK = 'ADD_LINK';

const addLinkFetcher = async (
  _,
  { arg: { link } }: { arg: { link: string } }
) => {
  const supabase = createClient();
  const { data, error: authError } = await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  const { data: website, error: fetchError } = await supabase
    .from('websites')
    .select('links')
    .eq('id', data.user.id)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const links = website.links || [];

  if (Array.isArray(links)) {
    links.push(link);
  } else {
    throw new Error('Invalid format');
  }

  const { error } = await supabase
    .from('websites')
    .update({ links: links })
    .eq('id', data.user.id);

  if (error) {
    throw error;
  }
};

export const useAddLink = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    ADD_LINK,
    addLinkFetcher
  );
  const { toast } = useToast();

  const addLink = useCallback(
    async (link: string) => {
      try {
        await trigger({ link });
        toast({
          title: 'Success',
          description: 'Link added successfully.',
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred while adding the link.',
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
    addLink,
  };
};
