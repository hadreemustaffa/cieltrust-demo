import { injectSpeedInsights } from '@vercel/speed-insights';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@/index.css';

import App from '@/App';
import { store } from '@/store';

injectSpeedInsights();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
