const CACHE_NAME = 'rspost02a07e';

const URLS_TO_CACHE = [
  '/rspost02a07e/',
    '/rspost02a07e/index.html',
    '/rspost02a07e/icons/icon-192x192.png',
    '/rspost02a07e/icons/icon-512x512.png',
'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js'
];


// Service Worker ကို Install လုပ်ခြင်း
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Network request များကို ကြားဖြတ်ဖမ်းယူခြင်း (Fetch Event)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache ထဲမှာ တောင်းဆိုတဲ့ဖိုင်ရှိနေရင် Cache ထဲကဟာကို ပြန်ပေးမယ်
        if (response) {
          return response;
        }
        // Cache ထဲမှာမရှိရင် Network ကနေ သွားယူမယ်
        return fetch(event.request);
      }
    )
  );
});

// Service Worker အဟောင်းများကို ရှင်းလင်းခြင်း (Activate Event)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Whitelist ထဲမှာမပါတဲ့ Cache အဟောင်းတွေကို ဖျက်ထုတ်မယ်
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});