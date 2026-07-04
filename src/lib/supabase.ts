import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True only when both Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(url && anonKey);

// Falls back to harmless placeholders so the app still boots without env vars;
// any call will simply fail and surface a "not configured" message in the UI.
export const supabase = createClient(url ?? 'http://localhost', anonKey ?? 'public-anon-key');

/** A contact-form submission as stored in the `submissions` table. */
export interface Submission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
}
