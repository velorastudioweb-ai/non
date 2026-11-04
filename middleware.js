/* Edge middleware: applies CMS-managed redirects without a redeploy.
 * The redirect table lives in the CMS site document (cms/site.json →
 * redirects[]) and is cached for ~60 seconds. Build-time vercel.json 301s
 * take precedence at the routing layer, so this only adds new redirects. */
import { get } from '@vercel/blob';

let cache = { at: 0, list: [] };

async function redirects() {
  if (Date.now() - cache.at < 60000) return cache.list;
  try {
    const res = await get('cms/site.json', { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN, useCache: false, abortSignal: AbortSignal.timeout(3000) });
    const text = await new Response(res.stream).text();
    const doc = JSON.parse(text);
    cache = { at: Date.now(), list: (doc && Array.isArray(doc.redirects) ? doc.redirects : []) };
  } catch (e) {
    cache.at = Date.now();
  }
  return cache.list;
}

export default async function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;
  if (path.indexOf('.') > -1) return;
  const list = await redirects();
  if (!list.length) return;
  const hit = list.find((r) => r && r.from && (r.from === path || r.from === path + '/' || r.from + '/' === path));
  if (!hit || !hit.to) return;
  const dest = new URL(hit.to, url);
  dest.search = url.search;
  const res = Response.redirect(dest.toString(), hit.permanent === false ? 302 : 301);
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export const config = {
  matcher: ['/((?!api|admin|assets|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)']
};
