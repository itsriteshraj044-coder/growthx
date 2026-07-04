import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Loader } from './components/common/Loader';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './routes/AppRoutes';

// Secret admin slug — not linked anywhere on the site. Change this string to
// rotate the URL. The page is further protected by a Supabase login.
export const ADMIN_SLUG = '/admin-gx-8f3a2c';

const Admin = lazy(() => import('./pages/Admin'));

function AppShell() {
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState(false);

  // Warm the home chunk while the preloader plays so the hero is ready on reveal.
  useEffect(() => {
    import('./pages/Home');
  }, []);

  // Admin dashboard lives entirely outside the marketing site chrome.
  if (pathname === ADMIN_SLUG) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-navy-950" />}>
        <Admin />
      </Suspense>
    );
  }

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
