import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Thinking } from './pages/Thinking';

// Scroll to top on route change; honor #work anchor on home.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<Work />} />
        <Route path="/thinking/:slug" element={<Thinking />} />
      </Routes>
    </BrowserRouter>
  );
}
