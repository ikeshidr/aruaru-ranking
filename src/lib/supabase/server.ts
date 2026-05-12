import { cookies } from 'next/headers';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/database.types';

function getSupabaseEnvironment() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return { supabaseUrl, supabaseAnonKey };
}

export async function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnvironment();
  const cookieStore = await cookies();

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem(key) {
          return cookieStore.get(key)?.value ?? null;
        },
        setItem(key, value) {
          try {
            cookieStore.set(key, value, {
              path: '/',
              httpOnly: true,
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 365,
            });
          } catch {
            // Server Component render では Cookie を変更できないため無視する
          }
        },
        removeItem(key) {
          try {
            cookieStore.delete(key);
          } catch {
            // Server Component render では Cookie を変更できないため無視する
          }
        },
      },
    },
  });
}
