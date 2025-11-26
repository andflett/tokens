/**
 * Theme queries for Supabase
 */

import { createClient } from './server';
import type { Theme, ThemeInsert, ThemeUpdate } from './database.types';

/**
 * Get all themes for the current user
 */
export async function getUserThemes(): Promise<Theme[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching themes:', error);
    return [];
  }
  
  return (data as Theme[]) || [];
}

/**
 * Get a single theme by ID
 */
export async function getTheme(id: string): Promise<Theme | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching theme:', error);
    return null;
  }
  
  return data as Theme;
}

/**
 * Create a new theme
 */
export async function createTheme(theme: ThemeInsert): Promise<Theme | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('themes')
    .insert(theme)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating theme:', error);
    return null;
  }
  
  return data as Theme;
}

/**
 * Update an existing theme
 */
export async function updateTheme(
  id: string,
  updates: ThemeUpdate
): Promise<Theme | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('themes')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating theme:', error);
    return null;
  }
  
  return data as Theme;
}

/**
 * Delete a theme
 */
export async function deleteTheme(id: string): Promise<boolean> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('themes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting theme:', error);
    return false;
  }
  
  return true;
}

/**
 * Get public themes (for showcase/gallery)
 */
export async function getPublicThemes(limit: number = 20): Promise<Theme[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching public themes:', error);
    return [];
  }
  
  return (data as Theme[]) || [];
}

/**
 * Duplicate a theme
 */
export async function duplicateTheme(id: string, newName: string): Promise<Theme | null> {
  const original = await getTheme(id);
  
  if (!original) {
    return null;
  }
  
  return createTheme({
    name: newName,
    brand_colors: original.brand_colors,
    tokens: original.tokens,
    mode: original.mode,
    is_public: false,
  });
}
