self.addEventListener("activate", function (event) {
  const current = ["{{ theme_alias }}"];

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (current.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.url.match("{{ theme_alias }}")) {
    e.respondWith(
      caches.match(e.request).then(function (resp) {
        if (resp !== undefined) {
          return resp;
        } else {
          return fetch(e.request, {
            cache: "no-store",
          })
            .then(function (resp) {
              let clone = resp.clone();
              caches.open("{{ theme_alias }}").then(function (cache) {
                cache.put(e.request, clone);
              });
              return resp;
            })
            .catch(console.log);
        }
      })
    );
  }
});
