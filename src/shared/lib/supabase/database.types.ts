export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          slug: string | null;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          slug?: string | null;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          slug?: string | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'articles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_settings: {
        Row: {
          domain: string | null;
          hide_website: boolean;
          id: string;
        };
        Insert: {
          domain?: string | null;
          hide_website?: boolean;
          id?: string;
        };
        Update: {
          domain?: string | null;
          hide_website?: boolean;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_settings_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      websites: {
        Row: {
          created_at: string | null;
          description: string | null;
          font: Database['public']['Enums']['Fonts'];
          id: string;
          links: string[] | null;
          location: string | null;
          photo_url: string | null;
          slug: string | null;
          theme: Database['public']['Enums']['Themes'];
          title: string | null;
          updated_at: string | null;
          workplace: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          font?: Database['public']['Enums']['Fonts'];
          id: string;
          links?: string[] | null;
          location?: string | null;
          photo_url?: string | null;
          slug?: string | null;
          theme?: Database['public']['Enums']['Themes'];
          title?: string | null;
          updated_at?: string | null;
          workplace?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          font?: Database['public']['Enums']['Fonts'];
          id?: string;
          links?: string[] | null;
          location?: string | null;
          photo_url?: string | null;
          slug?: string | null;
          theme?: Database['public']['Enums']['Themes'];
          title?: string | null;
          updated_at?: string | null;
          workplace?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Fonts:
        | 'Roboto'
        | 'Open Sans'
        | 'Montserrat'
        | 'Inter'
        | 'Rubik'
        | 'Noto Sans'
        | 'Raleway'
        | 'Mulish'
        | 'PT Serif'
        | 'Jost';
      Themes:
        | 'White'
        | 'Black'
        | 'Pastel'
        | 'Vintage'
        | 'Retro'
        | 'Minimalist'
        | 'Modern'
        | 'Classic'
        | 'Elegant'
        | 'Sophisticated'
        | 'Urban'
        | 'Artistic';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
