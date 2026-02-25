const CACHE_NAME = 'agricactus-v86-v1';
const assets = [
  './',
  'index.html',
  'manifest.json'
];

// Instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Permite que la app funcione sin conexión buscando primero en el caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
