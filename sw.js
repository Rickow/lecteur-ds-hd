"use strict";
/* Service worker — Lecteur DS HD (DeSmuME).
   Correctif : Safari refuse qu'un SW serve une réponse "redirigée" pour une navigation
   ("Response served by service worker has redirections"). On reconstruit donc chaque
   réponse avant de la mettre en cache, ce qui efface le drapeau redirected. */
const CACHE = 'ds-desmume-hd-v4';
const PAGE = './lecteur-ds-hd.html';
const PRECACHE = [PAGE, './manifest.json', './apple-touch-icon.png', './icon-512.png'];

/* recrée une réponse "propre" (sans drapeau redirected) */
async function clean(resp) {
  if (!resp) return resp;
  try {
    const body = await resp.clone().arrayBuffer();
    return new Response(body, { status: resp.status, statusText: resp.statusText, headers: resp.headers });
  } catch (e) { return resp; }
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE);
      await Promise.all(PRECACHE.map(async u => {
        try {
          const r = await fetch(u, { cache: 'reload' });
          if (r && r.ok) await cache.put(u, await clean(r));
        } catch (e) {}
      }));
    } catch (e) {}
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => e.waitUntil((async () => {
  try {
    const ks = await caches.keys();
    await Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)));
  } catch (e) {}
  await self.clients.claim();
})()));

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url; try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;

  event.respondWith((async () => {
    try {
      const cache = await caches.open(CACHE);

      if (req.mode === 'navigate') {
        try {
          const net = await fetch(req);
          // ne jamais renvoyer une réponse redirigée : Safari la rejette
          const out = net && net.redirected ? await clean(net) : net;
          if (out && out.ok) { try { await cache.put(PAGE, await clean(out)); } catch (e) {} }
          return out;
        } catch (e) {
          const c = (await cache.match(req)) || (await cache.match(PAGE));
          if (c) return c;
          throw e;
        }
      }

      // le HTML n'est JAMAIS servi depuis le cache en priorite (evite les versions fantomes)
      if (/\.html($|\?)/.test(url.pathname)) {
        try {
          const net = await fetch(req, { cache: 'reload' });
          if (net && net.ok) { try { await cache.put(req, await clean(net)); } catch (e) {} return net.redirected ? await clean(net) : net; }
        } catch (e) {}
        const c = await cache.match(req);
        if (c) return c;
      }
      const hit = await cache.match(req);
      if (hit) {
        event.waitUntil((async () => {
          try {
            const f = await fetch(req);
            if (f && f.ok && f.type === 'basic') await cache.put(req, await clean(f));
          } catch (e) {}
        })());
        return hit;
      }
      const r = await fetch(req);
      try { if (r && r.ok && r.status === 200 && r.type === 'basic') await cache.put(req, await clean(r)); } catch (e) {}
      return r;
    } catch (e) {
      return fetch(req);
    }
  })());
});
