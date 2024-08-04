import { create } from 'zustand';

export type SocialMediaType =
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'telegram'
  | 'youtube'
  | 'email';

interface SocialMediaData {
  value: string;
  error: string;
  filled: boolean;
  label: string;
}

interface SocialMediaStore {
  openInput: SocialMediaType | null;
  socialLinks: Record<SocialMediaType, SocialMediaData>;
  setOpenInput: (name: SocialMediaType | null) => void;
  setSocialLinkValue: (name: SocialMediaType, value: string) => void;
  setSocialLinkError: (name: SocialMediaType, error: string) => void;
  setSocialLinkFilled: (name: SocialMediaType, filled: boolean) => void;
}

export const useSocialMediaStore = create<SocialMediaStore>((set) => ({
  openInput: null,
  socialLinks: {
    twitter: { value: '', error: '', filled: false, label: 'Twitter' },
    instagram: { value: '', error: '', filled: false, label: 'Instagram' },
    linkedin: { value: '', error: '', filled: false, label: 'LinkedIn' },
    telegram: { value: '', error: '', filled: false, label: 'Telegram' },
    youtube: { value: '', error: '', filled: false, label: 'YouTube' },
    email: { value: '', error: '', filled: false, label: 'Email' },
  },
  setOpenInput: (inputName: SocialMediaType | null) =>
    set({ openInput: inputName }),
  setSocialLinkValue: (inputName: SocialMediaType, value: string) =>
    set((state) => ({
      socialLinks: {
        ...state.socialLinks,
        [inputName]: { ...state.socialLinks[inputName], value },
      },
    })),
  setSocialLinkError: (inputName: SocialMediaType, error: string) =>
    set((state) => ({
      socialLinks: {
        ...state.socialLinks,
        [inputName]: { ...state.socialLinks[inputName], error },
      },
    })),
  setSocialLinkFilled: (inputName: SocialMediaType, filled: boolean) =>
    set((state) => ({
      socialLinks: {
        ...state.socialLinks,
        [inputName]: { ...state.socialLinks[inputName], filled },
      },
    })),
}));
