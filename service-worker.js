// Service Worker Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('offline-cache').then((cache) => {
            console.log('Service Worker: Caching offline page');
            return cache.addAll([
                'offline.html',  // Pastikan offline.html berada di lokasi yang benar
                '/'  // Cache halaman utama juga (opsional)
            ]);
        })
    );
});

// Service Worker Activate Event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== 'offline-cache') {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Service Worker Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => caches.match('offline.html'));
        })
    );
});
