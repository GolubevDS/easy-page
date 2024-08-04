import { create } from 'zustand';
import { createClient } from '@/shared/lib/supabase/client';
import { Website } from '../types';

interface WebsiteStore {
  data: Website | null;
  isLoading: boolean;
  updateData: (data: Website) => void;
  initializeData: () => void;
}

export const useWebsiteStore = create<WebsiteStore>((set) => ({
  data: null,
  isLoading: true,
  initializeData: async () => {
    set({ isLoading: true });

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      const { data: website } = await supabase
        .from('websites')
        .select(`*`)
        .eq('id', data.user.id)
        .single();

      set({ data: website });
    } finally {
      set({ isLoading: false });
    }
  },
  updateData: (data) => set({ data }),
}));

export const selectData = (state: WebsiteStore) => state.data;
export const selectIsLoading = (state: WebsiteStore) => state.isLoading;
export const selectInitializeData = (state: WebsiteStore) =>
  state.initializeData;
export const selectUpdateData = (state: WebsiteStore) => state.updateData;
export const selectTitle = (state: WebsiteStore) => state.data?.title;
export const selectDescription = (state: WebsiteStore) =>
  state.data?.description;
export const selectFont = (state: WebsiteStore) => state.data?.font;
export const selectTheme = (state: WebsiteStore) => state.data?.theme;
export const selectLocation = (state: WebsiteStore) => state.data?.location;
export const selectPhotoUrl = (state: WebsiteStore) => state.data?.photo_url;
export const selectSlug = (state: WebsiteStore) => state.data?.slug;
export const selectLinks = (state: WebsiteStore) =>
  state.data?.links;
export const selectCreatedAt = (state: WebsiteStore) => state.data?.created_at;
export const selectUpdatedAt = (state: WebsiteStore) => state.data?.updated_at;
export const selectWorkplace = (state: WebsiteStore) => state.data?.workplace;
