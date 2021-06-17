self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('ergasia_3').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/favicon.ico',
                '/main.js',
                '/manifest.json',
                '/style.css',
                '/icon192.png',
                '/mail.png',
                '/bootstrap-4.3.1-dist/css/bootstrap.min.css',
                '/bootstrap-4.3.1-dist/js/jquery.min.js',
                '/bootstrap-4.3.1-dist/js/bootstrap.bundle.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || caches.match('/index.html');
        })
    );
});
