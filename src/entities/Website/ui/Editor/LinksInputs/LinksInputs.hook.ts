import { useAddLink, useDeleteLink } from '@/entities/Website/api';
import {
  selectLinks,
  useWebsiteStore,
} from '@/entities/Website/model/store/useWebsiteStore';
import { isValidUrl } from '@/shared/lib/utils';
import { useToast } from '@/shared/ui/use-toast';
import { ChangeEvent, useState } from 'react';

export const useLinksInputs = () => {
  const [newLink, setNewLink] = useState('');
  const { isLoading: isAddLoading, addLink } = useAddLink();
  const { isLoading: isDeleteLoading, deleteLink } = useDeleteLink();
  const links = useWebsiteStore(selectLinks) || [];
  const { toast } = useToast();

  const handleNewLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewLink(event.target.value);
  };

  const handleAddLink = async () => {
    if (!isValidUrl(newLink)) {
      toast({
        title: 'Error',
        description: 'Invalid URL format',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    if (links.includes(newLink)) {
      toast({
        title: 'Error',
        description: 'This link already exists',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    await addLink(newLink);
    setNewLink('');
  };

  const handleDeleteLink = async (link: string) => {
    await deleteLink(link);
  };

  return {
    links: links,
    handleNewLinkChange,
    handleAddLink,
    handleDeleteLink,
    isAddLoading,
    isDeleteLoading,
    newLink,
  };
};
