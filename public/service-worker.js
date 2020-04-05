var CACHE_NAME = "my-site-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";
var FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/db.js",
    "/index.js",
    "/style.css",
    "/manifest.webmanifest"
];

//install
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Opened cache");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    //   self.skipWaiting();
});

// activate
self.addEventListener("activate", evt => {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

//fetch
self.addEventListener("fetch", event => {
    // cache all get requests to /api routes
    if (event.request.url.includes("/api/")) {
        event.respondWith(
            caches
            .open(DATA_CACHE_NAME)
            .then(cache => {
                console.log(cache);
                console.log(event.request);
                return fetch(event.request)
                    .then(response => {
                        // If the response was good, clone it and store it in the cache.
                        if (response.status === 200) {
                            cache.put(event.request.url, response.clone());
                        }
                        return response;
                    })
                    .catch(err => {
                        // Network request failed, try to get it from the cache.
                        return cache.match(event.request);
                    });
            })
            .catch(err => console.log(err))
        );
        return;
    }

    //   evt.respondWith(
    //     caches.match(evt.request).then(function(response) {
    //       return response || fetch(evt.request);
    //     })
    //   );

    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request).then(function(response) {
                if (response) {
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    // return the cached home page for all requests for html pages
                    return caches.match("/index.html");
                }
            });
        })
    );
});