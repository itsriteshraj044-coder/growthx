import { useCallback, useEffect, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Lock, LogOut, RefreshCw, Loader2, Inbox, Mail, Phone, Trash2 } from 'lucide-react';
import { supabase, isSupabaseConfigured, type Submission } from '../lib/supabase';

function LoginCard({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    onSignedIn();
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-mint/60 focus:outline-none focus:ring-1 focus:ring-mint/40';

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 ring-1 ring-mint/30">
            <Lock className="h-5 w-5 text-mint" aria-hidden="true" />
          </span>
          <div>
            <h1 className="font-display text-lg font-bold text-white">Admin Access</h1>
            <p className="text-xs text-slate-400">GrowthX submissions dashboard</p>
          </div>
        </div>

        <label htmlFor="admin-email" className="mb-1.5 block text-sm text-slate-300">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />

        <label htmlFor="admin-password" className="mb-1.5 mt-4 block text-sm text-slate-300">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />

        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 text-sm font-semibold text-navy-950 transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

const AUTO_REFRESH_MS = 5000;

function Dashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // `silent` refreshes (auto-poll) update the list without flashing the spinner.
  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (fetchError) setError(fetchError.message);
    else setError(null);
    setRows((data as Submission[]) ?? []);
    if (!silent) setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const id = window.setInterval(() => load(true), AUTO_REFRESH_MS);
    return () => window.clearInterval(id);
  }, [load]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this submission permanently?')) return;
    setDeletingId(id);
    const { error: deleteError } = await supabase.from('submissions').delete().eq('id', id);
    setDeletingId(null);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Form Submissions</h1>
          <p className="mt-1 text-sm text-slate-400">
            {rows.length} total · auto-refresh 5s · signed in as {session.user.email}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => load()}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition-colors hover:border-mint/40"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition-colors hover:border-red-400/40 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </header>

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {loading ? (
        <div className="mt-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-mint" aria-hidden="true" />
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center text-slate-400">
          <Inbox className="h-12 w-12 text-slate-600" aria-hidden="true" />
          <p className="mt-4 text-sm">No submissions yet.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {rows.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-mint/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-white">{row.name}</h2>
                  <span className="mt-1 inline-block rounded-full bg-mint/10 px-2.5 py-0.5 text-xs font-medium text-mint ring-1 ring-mint/25">
                    {row.service}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <time className="text-xs text-slate-500">{formatDate(row.created_at)}</time>
                  <button
                    type="button"
                    onClick={() => handleDelete(row.id)}
                    disabled={deletingId === row.id}
                    aria-label={`Delete submission from ${row.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                  >
                    {deletingId === row.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                <a href={`mailto:${row.email}`} className="flex items-center gap-2 hover:text-mint">
                  <Mail className="h-4 w-4 text-mint" aria-hidden="true" />
                  {row.email}
                </a>
                {row.phone && (
                  <a href={`tel:${row.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-mint">
                    <Phone className="h-4 w-4 text-mint" aria-hidden="true" />
                    {row.phone}
                  </a>
                )}
              </div>

              <p className="mt-4 whitespace-pre-wrap rounded-xl bg-black/20 p-4 text-sm leading-relaxed text-slate-300">
                {row.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-8">
          <h1 className="text-lg font-bold text-white">Supabase not configured</h1>
          <p className="mt-2 text-sm text-slate-300">
            Add <code className="text-mint">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-mint">VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file,
            then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-mint" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {session ? <Dashboard session={session} /> : <LoginCard onSignedIn={() => undefined} />}
    </div>
  );
}
