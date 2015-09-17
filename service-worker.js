self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  var title = 'Yay a message.';
  var body = 'We have received a push message.';
  var icon = '/images/icon-192x192.png';
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag
    })
  );
});

self.addEventListener('fetch', function(event) {
  var headers = {};
  for (var key of event.request.headers.keys()) {
    headers[key] = event.request.headers.get(key);
  }
  console.log('REQ: ', event.request.url, headers);
  var url = event.request.url;
  var pr;
  if (url.indexOf('.mp5') !== -1) {
    pr = fetch('/big_buck_bunny.mp4', {
      headers: {
        'x-id': 'foobar'
      }
    });
  } else {
    pr = fetch(event.request);
  }
  pr.then(function(response) {
    var resHeaders = {};
    for (var key of response.headers.keys()) {
      resHeaders[key] = response.headers.get(key);
    }
    console.log('resHeadears', resHeaders);
  });
  event.respondWith(pr);
});
