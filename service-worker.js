const CACHE = 'ecmt-v1';
const FILES = [
  '/', 'index.html', 'style.css', 'common.css', 'common.js',
  'assets/fontawesome/css/all.min.css'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
