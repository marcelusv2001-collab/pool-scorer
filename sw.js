const CACHE_NAME = 'mvp-tv-v1';
// This list MUST match your filenames exactly
const ASSETS = [
  '/',
  'index.html',
  '8ball.html',
  '9ball.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Install the assets to the phone's memory
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Serve the assets even when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});