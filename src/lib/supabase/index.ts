/**
 * Supabase module exports
 * 
 * Note: Server functions and theme queries should be imported directly
 * from './server' and './themes' in Server Components/API routes only.
 * 
 * For client components, only import createBrowserClient.
 */

export { createClient as createBrowserClient } from './client';
export type { Database, Theme, ThemeInsert, ThemeUpdate } from './database.types';
