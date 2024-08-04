import useSWRMutation from 'swr/mutation';
import { createClient } from '@/shared/lib/supabase/client';
import { useToast } from '@/shared/ui/use-toast';
import { useCallback } from 'react';

const DELETE_LINK = 'DELETE_LINK';

const deleteLinkFetcher = async (
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

  let links = website.links || [];

  if (Array.isArray(links)) {
    links = links.filter((item) => item !== link);
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

export const useDeleteLink = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    DELETE_LINK,
    deleteLinkFetcher
  );
  const { toast } = useToast();

  const deleteLink = useCallback(
    async (link: string) => {
      try {
        await trigger({ link });
        toast({
          title: 'Success',
          description: `Link deleted successfully.`,
          duration: 5000,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: `Failed to delete link.`,
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
    deleteLink,
  };
};
