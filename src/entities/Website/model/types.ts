import { Database } from '@/shared/lib/supabase/database.types';

export type Website = Database['public']['Tables']['websites']['Row'];

export type Fonts = Database['public']['Enums']['Fonts'];
export interface NextFont {
  className: string;
  style: {
    fontFamily: string;
    fontWeight?: number;
    fontStyle?: string;
  };
}

export type ThemeNames = Database['public']['Enums']['Themes'];
export interface Theme {
  name: ThemeNames;
  background: string;
  text: string;
  textDemo: string;
  accent: string;
  accentText: string;
  hoverAccent: string;
  hoverAccentText: string;
}
