import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouteServices from './services/routeServices.ts';
import App from './App.tsx';
import './styles/index.css';

const queryClient = new QueryClient();
export const routeServices = new RouteServices();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
