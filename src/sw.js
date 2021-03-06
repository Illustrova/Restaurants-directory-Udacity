// Set a name for the current cache
const staticCache = "restaurants_1";
//Set urls to cache
const urls = [
  "/",
  "/index.html",
  "/restaurant.html",
  "sw.js",
  "/js/registerSW.js",
  "/js/dbhelper.js",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/css/main.css",
  "/data/restaurants.json",
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg"
];

//Start caching
self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches
      .open(staticCache)
      .then(function(cache) {
        return cache.addAll(urls);
      })
      .catch(function(err) {
        console.log(err);
      })
  );
});

// Get data from cache
self.addEventListener("fetch", function(evt) {
  evt.respondWith(
    caches
      .match(evt.request, {ignoreSearch:true})
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(evt.request);
      })
      .catch(function(err) {
        console.log(err);
      })
  );
});

// Remove old versions of cache
self.addEventListener("activate", function(evt) {
  console.log(caches.keys());
  evt.waitUntil(
    caches.keys().then(function(cacheNames) {
      console.log('cacheNames => ',cacheNames);
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            console.log('cacheName => ',cacheName);
            return cacheName != staticCache;
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});