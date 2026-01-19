import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FormspreeProvider } from '@formspree/react'; // ✅ Importante
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ✅ Envolvemos la app con FormspreeProvider */}
    <FormspreeProvider project="mldaeyak">
      <App />
    </FormspreeProvider>
  </StrictMode>
);