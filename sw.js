const CACHE_NAME = 'karlog-v3';
const urlsToCache = [
  '/Karlog/',
  '/Karlog/index.html'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // اجبار به نصب فوری
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // پاک کردن کش‌های قدیمی
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
