import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from './components/common/Loader';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Warm the home chunk while the preloader plays so the hero is ready on reveal.
  useEffect(() => {
    import('./pages/Home');
  }, []);

  return (
    <BrowserRouter>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      )}
    </BrowserRouter>
  );
}
