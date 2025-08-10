import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';

// Bootstrap: allow dynamic backend via URL param `api_url`
(function bootstrapApiBaseUrl() {
  try {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    const raw =
      url.searchParams.get('api_url') || url.searchParams.get('apiBaseUrl');
    if (raw && raw.trim().length > 0) {
      const normalized = raw.replace(/\/+$/, '');
      // Persist for subsequent visits
      localStorage.setItem('api_base_url', normalized);
      // Provide a runtime global as well
      (window as Window & { __API_BASE_URL__?: string }).__API_BASE_URL__ =
        normalized;
      // Optionally clean the URL
      url.searchParams.delete('api_url');
      url.searchParams.delete('apiBaseUrl');
      window.history.replaceState({}, '', url.toString());
    } else {
      // If no param this time, but we have a saved value, ensure the global is set
      const saved = localStorage.getItem('api_base_url') || '';
      if (saved) {
        (window as Window & { __API_BASE_URL__?: string }).__API_BASE_URL__ =
          saved;
      }
    }
  } catch {
    // ignore
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
