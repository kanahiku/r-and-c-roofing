import { spawnSync } from 'node:child_process';

function usage() {
  console.log(`Usage:
  npm run turnstile:create -- --slug <site-slug> --name <widget-name> --domain <hostname> [--domain <hostname>]

Example:
  npm run turnstile:create -- --slug rc-roofing --name "R&C Roofing contact" \\
    --domain roofinspectionhawaii.com --domain www.roofinspectionhawaii.com`);
}

function readArgs(argv) {
  const result = { domains: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (key === '--domain' && value) {
      result.domains.push(value);
      index += 1;
    } else if (key === '--slug' && value) {
      result.slug = value;
      index += 1;
    } else if (key === '--name' && value) {
      result.name = value;
      index += 1;
    } else if (key === '--help' || key === '-h') {
      result.help = true;
    } else {
      throw new Error(`Unknown or incomplete argument: ${key}`);
    }
  }
  return result;
}

function runWrangler(args, options = {}) {
  return spawnSync('npx', ['wrangler', ...args], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
    ...options,
  });
}

function bindingForSlug(slug) {
  return `TURNSTILE_SECRET_${slug.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`;
}

let options;
try {
  options = readArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  usage();
  process.exit(1);
}

if (options.help) {
  usage();
  process.exit(0);
}

if (!options.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.slug)) {
  console.error('--slug is required and must contain lowercase letters, numbers, and single hyphens only.');
  process.exit(1);
}
if (!options.name) {
  console.error('--name is required.');
  process.exit(1);
}
if (options.domains.length === 0 || options.domains.some((domain) => !/^[a-z0-9.-]+$/i.test(domain))) {
  console.error('Provide at least one valid hostname with --domain (hostname only, without https:// or a path).');
  process.exit(1);
}

const create = runWrangler([
  'turnstile',
  'widget',
  'create',
  options.name,
  '--mode',
  'managed',
  '--json',
  ...options.domains.flatMap((domain) => ['--domain', domain]),
]);

if (create.status !== 0) {
  console.error('Cloudflare could not create the Turnstile widget.');
  console.error(create.stderr.trim());
  process.exit(create.status || 1);
}

let widget;
try {
  widget = JSON.parse(create.stdout.trim());
} catch {
  console.error('Cloudflare created the widget, but Wrangler returned an unexpected response.');
  console.error('Open the Turnstile dashboard to rotate its secret and finish setup manually.');
  process.exit(1);
}

const sitekey = widget.sitekey ?? widget.siteKey;
const secret = widget.secret;
if (typeof sitekey !== 'string' || typeof secret !== 'string') {
  console.error('The widget response did not contain the expected key pair.');
  console.error('Open the Turnstile dashboard to rotate its secret and finish setup manually.');
  process.exit(1);
}

const binding = bindingForSlug(options.slug);
const putSecret = runWrangler(['secret', 'put', binding], {
  input: `${secret}\n`,
});

if (putSecret.status !== 0) {
  console.error(`The widget was created, but Cloudflare could not save ${binding}.`);
  console.error('Rotate the widget secret in the dashboard and run `wrangler secret put` manually.');
  console.error(putSecret.stderr.trim());
  process.exit(putSecret.status || 1);
}

console.log(`Turnstile is ready for ${options.slug}.`);
console.log(`Worker secret binding: ${binding}`);
console.log(`PUBLIC_TURNSTILE_SITE_KEY=${sitekey}`);
console.log('Add the public key to the matching Vercel project, then redeploy the website.');
