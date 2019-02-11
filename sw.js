const version = 'v0.01';
const staticCacheName = version + 'staticFiles';


console.log('Hello from sw.js');
// fresh scripts from scratch

// install and add to cache
addEventListener('install', function (installEvent){
  // cache some files
  console.log('The service worker is installing...');
  skipWaiting();
  installEvent.waitUntil(
    caches.open(staticCacheName)
    .then(staticCache => {
        console.log('Adding to cache');
      //nice to haves
       staticCache.addAll([
        // static files to cache
        // '/path/font.woff',
        // '/path/icon.svg',
      ]); //end return addAll

      // must haves
      return staticCache.addAll([
        // static files to cache
         '/css/main.css',
         '/js/app.js',
      ]); //end return addAll

    }) //end then
  ); //end waitUntil
}); //end addEventListener



addEventListener('activate', function (activateEvent){
  // delete old caches
  console.log('The service worker is activated.');
  activateEvent.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map( cacheName => {
          if (cacheName != staticCacheName) {
            return caches.delete(cacheName);
          } //end if
        }) // end map
      ); // end return Promise.all
    }) // end keys then
    .then( () => {
      return clients.claim();
    }) // end then
  ); //end waitUntil
}); // end addEventListener



addEventListener('fetch', function (fetchEvent){
  // console.log('The service worker is listening.');
  const request = fetchEvent.request;

  fetchEvent.respondWith(
    // first look in cache
    caches.match(request)
    .then(responseFromCache => {
      if (responseFromCache) {
        console.log('fetching from cache');
        return responseFromCache;
      } // end if
      // otherwise fetch from network
      console.log('fetching from network');
      return fetch(request);
    }) // end match then


    // .then(responseFromFetch =>{
    //   return responseFromFetch;
    // }) //end fetch then


    // if offline/no network connection show this
    .catch(error => {
      return new Response('<h1>Oops!</h1> <p>Something went wrong.</p>',
      {
        headers: {'Content-type' : 'text/html; charset=utf-8'}
      }
    );
  }) // end feth catch

); // end respondWith
}); // end addEventListener















//
// Scripts and recipies from Workbox
//
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
//
// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log("Boo! Workbox didn't load 😬");
// }
//
// workbox.googleAnalytics.initialize();
//
// workbox.precaching.precacheAndRoute([]);
//
// workbox.routing.registerRoute(
//   new RegExp('/(.*)'),
//   workbox.strategies.staleWhileRevalidate(),
// );
//
// workbox.routing.registerRoute(
//   new RegExp('/work/img/(.*)'),
//   workbox.strategies.staleWhileRevalidate(),
// );
//
// workbox.routing.registerRoute(
//   // Cache CSS files
//   /.*\.css/,
//   // Use cache but update in the background ASAP
//   workbox.strategies.staleWhileRevalidate({
//     // Use a custom cache name
//     cacheName: 'css-cache',
//   })
// );
//
// workbox.routing.registerRoute(
//   // Cache JS files
//   /.*\.js/,
//   // Use cache but update in the background ASAP
//   workbox.strategies.staleWhileRevalidate({
//     // Use a custom cache name
//     cacheName: 'js-cache',
//   })
// );
//
// workbox.routing.registerRoute(
//   new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'googleapis',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 30,
//       }),
//     ],
//   }),
// );
//
//
// workbox.routing.registerRoute(
//   /\.(?:png|gif|jpg|jpeg|svg)$/,
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   }),
// );
