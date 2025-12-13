const CACHE_NAME = "ecocodigo-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/login.html",
  "/registro.html",
  "/manifest.json",
  "/resources/css/style.css",
  "/resources/js/scripst.js",
  "/resources/js/login.js",
  "/resources/js/registro.js",
  "/resources/images/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
