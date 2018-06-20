// install trigger for sw - cache index.html

self.addEventListener('install', function(event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open('offline').then(function(cache) {
        return cache.put(indexPage, response);
      });
  }));
});

// fetch trigger - serve from cache or fetch from server, cache the file if not previously cached

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      return caches.open('offline').then(function(cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(function (error) {
      caches.match(event.request).then(function(resp) {
        return resp;    
      });
    })
  );
});