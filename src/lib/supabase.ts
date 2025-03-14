import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  {
    auth: { persistSession: false },
    global: { 
      headers: { 
        "apikey": import.meta.env.VITE_SUPABASE_KEY,
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`
      }
    }
  }
);
