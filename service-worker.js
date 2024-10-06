// Service Worker Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('offline-cache').then((cache) => {
            console.log('Service Worker: Caching offline resources');
            return cache.addAll([
                'offline.html',  // Halaman offline
                'styles.css',    // Tambahkan CSS
                'wlpprRRQ.jpg',  // Gambar background jika perlu
                'rrq.jpeg',      // Gambar logo RRQ
                '/'              // Halaman utama
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
            // Jika ada respon di cache, tampilkan cache
            if (response) {
                return response;
            }
            
            // Jika tidak ada, fetch dari jaringan, jika gagal, tampilkan halaman offline
            return fetch(event.request).catch(() => caches.match('offline.html'));
        })
    );
});
