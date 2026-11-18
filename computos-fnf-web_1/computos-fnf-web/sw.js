// Service worker mínimo: permite instalar la app y abrirla rápido.
// Los datos de electores NO se guardan en caché (siempre van a la base).
const CACHE = "computos-v1";
const ARCHIVOS = ["./", "index.html", "config.js", "manifest.webmanifest", "icons/logo-192.png", "icons/logo-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS))));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; }).catch(() => caches.match(e.request)));
});
