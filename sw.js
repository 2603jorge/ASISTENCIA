const CACHE_NAME = 'agricactus-v86-cache';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar y guardar archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Estrategia: Primero buscar en Red, si falla, ir a Caché (Network First)
// Esto asegura que si haces cambios al código, se actualicen al tener internet.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Limpiar cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
