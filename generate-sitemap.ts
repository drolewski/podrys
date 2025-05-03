import {writeFileSync} from 'fs';
import {resolve} from 'path';

const baseUrl = 'https://drolewski.github.io/podrys';
const date = (new Date()).toISOString();

interface Link {
    lang: string;
    otherLangs: Map<string, string>;
}

const routesWithLang = new Map<string, Link>([
    ['/', {lang: 'pl', otherLangs: new Map<string, string>([['en', '/en/']])}],
    ['/en', {lang: 'en', otherLangs: new Map<string, string>([['pl', '/']])}],
    ['/o-nas', {lang: 'pl', otherLangs: new Map<string, string>([['en', '/en/about']])}],
    ['/en/about', {lang: 'en', otherLangs: new Map<string, string>([['pl', '/o-nas']])}],
]);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...routesWithLang]
    .map(
        ([key, value]) => {
            return `  <url>
    <loc>${baseUrl}${key}</loc>
    <lastmod>${date}</lastmod>
    <xhtml:link rel="alternate" hreflang="${value.lang}" href="${baseUrl}${key}" />
    ${[...value.otherLangs].map(([k, v]) => `<xhtml:link rel="alternate" hreflang="${k}" href="${baseUrl}${v}" />`)}
  </url>`;
        }
    )
    .join('\n')}
</urlset>
`;

writeFileSync(resolve('public', 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated successfully.!');