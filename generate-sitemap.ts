import { writeFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://podrys.pl';
const date = (new Date()).toISOString();

const routes = [
    '',
    'about',
    'contact',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map(
        (route) => `  <url>
    <loc>${baseUrl}/${route}</loc>
    <lastmod>${date}</lastmod>
  </url>`
    )
    .join('\n')}
</urlset>
`;

writeFileSync(resolve('public', 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated successfully.!');