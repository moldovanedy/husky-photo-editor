try {
    const PRECACHE = "precache-v2";
    const RUNTIME = "runtime";

    // A list of local resources we always want to be cached.
    const PRECACHE_URLS = [
        "/",
        "/take-photo",
        "/edit",
        "/privacy-policy",
        "/settings",
        "/favicon.ico",
        "/assets/logo/logo.svg",
        "/assets/logo/logo64x64.png",
        "/assets/logo/logo192x192.png",
        "/assets/logo/logo512x512.png"
    ];

    // The install handler takes care of precaching the resources we always need.
    self.addEventListener("install", (event) => {
        event.waitUntil(
            caches
                .open(PRECACHE)
                .then((cache) => cache.addAll(PRECACHE_URLS))
                .then(self.skipWaiting())
        );
    });
    // The activate handler takes care of cleaning up old caches.
    self.addEventListener("activate", (event) => {
        const currentCaches = [PRECACHE, RUNTIME];
        event.waitUntil(
            caches
                .keys()
                .then((cacheNames) => {
                    return cacheNames.filter(
                        (cacheName) => !currentCaches.includes(cacheName)
                    );
                })
                .then((cachesToDelete) => {
                    return Promise.all(
                        cachesToDelete.map((cacheToDelete) => {
                            return caches.delete(cacheToDelete);
                        })
                    );
                })
                .then(() => self.clients.claim())
        );
    });

    // The fetch handler serves responses for same-origin resources from a cache.
    // If no response is found, it populates the runtime cache with the response
    // from the network before returning it to the page.
    self.addEventListener("fetch", (event) => {
        // Skip cross-origin requests, like those for Google Analytics.
        if (event.request.url.startsWith(self.location.origin)) {
            // event.respondWith(
            // caches.match(event.request).then((cachedResponse) => {
            //     if (cachedResponse) {
            //         return cachedResponse;
            //     }

            //     return caches.open(RUNTIME).then((cache) => {
            //         return fetch(event.request, {}).then((response) => {
            //             // Put a copy of the response in the runtime cache.
            //             return cache
            //                 .put(event.request, response.clone())
            //                 .then(() => {
            //                     return response;
            //                 })
            //                 .catch(() => {});
            //         });
            //     });
            // })

            event.respondWith(
                caches.open(PRECACHE).then(async function (cache) {
                    const response = await cache.match(event.request);
                    return (
                        response ||
                        fetch(event.request).then(function (response_1) {
                            cache.put(event.request, response_1.clone());
                            return response_1;
                        })
                    );
                })
            );
            // );
        }
    });
} catch (e) {
    console.log(e);
}

