export const prerender = false;

import type { APIRoute } from 'astro';
import { SITE } from 'astrowind:config';
import { getPublicContentPaths } from '~/lib/content';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function siteOrigin() {
  const fromEnv = import.meta.env.SITE_URL?.replace(/\/+$/, '');
  const fromConfig = typeof SITE.site === 'string' ? SITE.site.replace(/\/+$/, '') : '';
  return fromEnv || fromConfig || 'https://randcroofing.com';
}

export const GET: APIRoute = async () => {
  const origin = siteOrigin();
  const paths = [...new Set(await getPublicContentPaths())];
  const urls = paths
    .map((path) => {
      const loc = `${origin}${path === '/' ? '/' : path}`;
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300',
    },
  });
};
