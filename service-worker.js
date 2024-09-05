var cacheName = 'Noise主页-v3.0';
var assetsToCache = [
  './home.html',
  './index.html',
  './assets/sound/鼠点左1.mp3',
  './assets/sound/鼠点左2.mp3',
  './assets/sound/缓慢1.mp3',
  './assets/sound/风铃.mp3',
  './assets/sound/开瓶.mp3',
  './assets/sound/叮.mp3',
  './assets/sound/嘟.mp3',
  './assets/sound/动1.mp3',
  './assets/sound/载入.mp3',
  './assets/sound/滴滴.mp3',
  './assets/sound/打字.mp3',
  './assets/sound/jump.mp3',
  './assets/31.jpeg',
  './assets/3.png',
  './assets/1ae.gif',
  './assets/2ae.gif',
  './assets/3ae.gif',
  './assets/4ae.gif',
  './assets/5ae.gif',
  './assets/6ae.gif',
  '.js/sound.js',
  './js/jquery.min.js',
  './js/APlayer.min.js',
  './js/Meting.min.js',
  './js/suiji-picture.js',
  './js/Right.js',
  './js/subscription-form.js',
  '/js/main.js',
  './js/home-script.js',
  './js/AD.js',
  './js/emb.js',
  './css/home-APlayer.min.css',
  './css/home-style.css',
  './css/root.css',
  './css/style.css',
  '/css/main.css',
  './assets/1ae.gif',

  './assets/bg/bg1.png',
  './assets/bg/bg2.png',
  './assets/bg/bg3.png',
  './assets/bg/bg4.png',
  './assets/bg/bg5.png',
  './assets/bg/bg6.png',
  './assets/bg/bg7.png',
  './assets/bg/bg8.png',
  './assets/bg/bg9.png',
  './assets/bg/bg10.png',
  './assets/bg/bg11.png',
  './assets/bg/bg12.png',
  './assets/bg/bg13.png',
  '/assets/bg/bg14.png',

  './assets/mobilebg/bg1.png',
  './assets/mobilebg/bg2.png',
  './assets/mobilebg/bg3.png',
  './assets/mobilebg/bg4.png',
  './assets/mobilebg/bg5.png',
  './assets/mobilebgbg6.png',
  './assets/mobilebg/bg7.png',
  './assets/mobilebg/bg8.png',
  './assets/mobilebg/bg9.png',
 
  // 添加您需要缓存的其他静态资源
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        // 检查资源是否需要刷新
        event.waitUntil(
          refreshCache(event.request)
        );
        return response;
      }

      // 如果请求未在缓存中找到，则发起网络请求
      return fetch(event.request).then(function(networkResponse) {
        // 将请求的响应添加到缓存中
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, networkResponse.clone());
        });

        return networkResponse;
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          // 删除旧版本的缓存
          return name !== cacheName;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});

// 定义一个函数来刷新缓存
function refreshCache(request) {
  return fetch(request).then(function(networkResponse) {
    if (networkResponse && networkResponse.status === 200) {
      return caches.open(cacheName).then(function(cache) {
        return cache.put(request, networkResponse.clone());
      });
    }
  }).catch(function(error) {
    console.error('Error refreshing cache for ', request.url, error);
  });
}
