import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import './index.css';
import { initializeAuth } from './features/auth/hooks/use-auth';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Start MSW in development mode if VITE_ENABLE_MOCKS is enabled
async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    console.log('[MSW] Initializing Mock Service Worker...');
    const { worker } = await import('./mocks/browser');

    // Start the worker with onUnhandledRequest set to 'bypass' to allow real API calls
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('[MSW] Mock Service Worker started successfully');
  }
}

// Initialize application
async function initializeApp() {
  // Start mocking if enabled
  await enableMocking();

  // Initialize auth state before rendering
  await initializeAuth();

  // Render the app
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

initializeApp();
