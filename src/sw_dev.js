importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

//registerRoute
const matchImageFunction = ({url, request, event}) => {
    return url.href.indexOf("catalogApi/api/v1/catalog/file") > -1;
};
workbox.routing.registerRoute(
    matchImageFunction,///(\/#)|(\/$)/,
    workbox.strategies.cacheFirst({
        cacheName: 'CatalogImages',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 600,
                maxAgeSeconds: 300 * 24 * 60 * 60, // 300 Days
            }),
        ],
    })
);



const matchFunction = ({url, request, event}) => {
    return url.pathname === '/';
};

workbox.routing.registerRoute(
    matchFunction,
    workbox.strategies.networkFirst(),
);

const matchApiFunction = ({url, request, event}) => {
    return url.href.indexOf("catalogApi/api/v1") > -1;
};
//NetworkFirst
workbox.routing.registerRoute(
    matchApiFunction,
    workbox.strategies.networkFirst({cacheName: 'CatalogApi'}),
);


workbox.routing.registerRoute(
    /\.(?:js|gz|css|html)$/,
    workbox.strategies.networkFirst(),
);

///catalogApi/api/v1/catalog/file/5f9f095f25a21c451c2bce86
//  /\/catalogApi/\v1/\/catalog\/file/
/*
workbox.routing.registerRoute(
    /(\/api)(?!\/v1\/catalog\/file\/)/,
    workbox.strategies.networkFirst({cacheName: 'main', networkTimeoutSeconds: 5})
);
*/