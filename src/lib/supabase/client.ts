import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/lib/supabase/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      client: null,
      error:
        '環境変数が未設定です。.env.local に NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を設定してください。'
    } as const;
  }

  return {
    client: createClient<Database>(supabaseUrl, supabaseAnonKey),
    error: null
  } as const;
}
