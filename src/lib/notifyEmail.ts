function readEnv(name: string, fallback = '') {
  const fromProcess = typeof process !== 'undefined' ? process.env[name] : undefined;
  const fromMeta = import.meta.env[name] as string | undefined;
  return (fromProcess || fromMeta || fallback).trim();
}

/** Contact-form lead inbox. Set `NOTIFY_EMAIL` in `.env` locally and on Vercel. */
export function getNotifyEmail() {
  return readEnv('NOTIFY_EMAIL', 'info@safehomeservice.com');
}
