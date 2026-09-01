// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />
/// <reference types="../vendor/integration/types.d.ts" />

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID?: string;
  readonly SANITY_DATASET?: string;
  readonly SANITY_API_TOKEN?: string;
  readonly SANITY_WRITE_TOKEN?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_FROM?: string;
  readonly NOTIFY_EMAIL?: string;
  readonly SITE_NAME?: string;
  readonly SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
