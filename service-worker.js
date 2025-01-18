// Versione del cache
const CACHE_NAME = 'greensaver-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Aprendo cache e aggiungendo risorse');
        return cache.addAll(urlsToCache);
      })
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Cancellando cache vecchie:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch e strategia di cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Restituisce la risorsa dalla cache se disponibile
        if (response) {
          return response;
        }

        // Clona la richiesta poiché è una stream e può essere usata solo una volta
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (networkResponse) => {
            // Verifica se la risposta è valida
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clona la risposta poiché è una stream e può essere usata solo una volta
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
      })
      .catch(() => {
        // Opzionale: ritorna una pagina di fallback se la rete è assente
        return caches.match('/index.html');
      })
  );
});
