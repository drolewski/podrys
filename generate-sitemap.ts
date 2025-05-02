import { writeFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://podrys.pl';

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
  </url>`
    )
    .join('\n')}
</urlset>
`;

writeFileSync(resolve('dist', 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated successfully.!');