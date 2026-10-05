import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider.tsx';

document.body.className =
  'overflow-y-scroll bg-[#F5F4F0] [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#E2E0D8] [&::-webkit-scrollbar-thumb:hover]:bg-[#7A7669]';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </AuthProvider>,
);
