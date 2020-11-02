importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.routing.registerRoute(
    /(http:\/\/api.netware.io\/catalogApi\/api\/v1\/catalog\/file)/,///(\/#)|(\/$)/,
    //workbox.strategies.staleWhileRevalidate({cacheName: 'main'}),
    //staleWhileRevalidate cacheFirst CacheOnly
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'CatalogImages',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 600,
                maxAgeSeconds: 300 * 24 * 60 * 60, // 300 Days
            }),
        ],
    })
);
/*
workbox.routing.registerRoute(
    /\.(?:js|gz|css|html)$/,
    workbox.strategies.staleWhileRevalidate(),
);
*/
///catalogApi/api/v1/catalog/file/5f9f095f25a21c451c2bce86
//  /\/catalogApi/\v1/\/catalog\/file/
/*
workbox.routing.registerRoute(
    /(\/api)(?!\/v1\/catalog\/file\/)/,
    workbox.strategies.networkFirst({cacheName: 'main', networkTimeoutSeconds: 5})
);
*/