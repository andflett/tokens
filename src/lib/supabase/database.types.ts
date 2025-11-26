/**
 * Supabase Database Types
 * These types define the database schema for Vibe Themes
 * 
 * To generate these types from your Supabase project:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
 */

export interface Database {
  public: {
    Tables: {
      themes: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          brand_colors: {
            primary: string;
            secondary: string;
            accent: string;
          };
          tokens: Record<string, unknown>;
          mode: 'light' | 'dark' | 'both';
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          name: string;
          brand_colors: {
            primary: string;
            secondary: string;
            accent: string;
          };
          tokens: Record<string, unknown>;
          mode?: 'light' | 'dark' | 'both';
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          brand_colors?: {
            primary: string;
            secondary: string;
            accent: string;
          };
          tokens?: Record<string, unknown>;
          mode?: 'light' | 'dark' | 'both';
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'themes_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Theme = Database['public']['Tables']['themes']['Row'];
export type ThemeInsert = Database['public']['Tables']['themes']['Insert'];
export type ThemeUpdate = Database['public']['Tables']['themes']['Update'];
