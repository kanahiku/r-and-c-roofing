export const prerender = false;

import type { APIRoute } from 'astro';
import { canonicalSiteOrigin, isIndexableHost } from '~/lib/indexing';

export const GET: APIRoute = async ({ request }) => {
  const isDev = import.meta.env.DEV;
  if (!isDev && !isIndexableHost(request.headers.get('host'))) {
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</sitemapindex>\n',
      {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=0, must-revalidate',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  }

  const origin = canonicalSiteOrigin();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
    },
  });
};
