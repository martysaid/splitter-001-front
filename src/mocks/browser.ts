import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Log when worker starts
worker.events.on('request:start', ({ request }) => {
  console.log('[MSW] Intercepting:', request.method, request.url);
});

worker.events.on('request:match', ({ request }) => {
  console.log('[MSW] Handler matched:', request.method, request.url);
});

worker.events.on('request:unhandled', ({ request }) => {
  console.log('[MSW] No handler found for:', request.method, request.url);
});
