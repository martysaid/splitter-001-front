/// <reference types="vite/client" />
/// <reference types="node" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  readonly VITE_ENABLE_MOCKS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
