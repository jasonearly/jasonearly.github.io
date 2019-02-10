console.log('Hello from sw.js');
// fresh scripts from scratch
addEventListener('install', function (event){
  console.log('The service worker is installing...');
});

addEventListener('activate', function (event){
  console.log('The service worker is activated.');
});

addEventListener('fetch', function (fetchEvent){
  // console.log('The service worker is listening.');
  const request = fetchEvent.request;

  fetchEvent.respondWith(
    fetch(request)
    .then(responseFromFetch =>{
      return responseFromFetch;
    }) //end fetch then

    // if offline/no network connection show this
    .catch(error => {
      return new Response('<h1>Oops!</h1> <p>Something went wrong.</p>',
      {
        headers: {'Content-type' : 'text/html; charset=utf-8'}
      }
    );
  }) // end feth catch
); // end respondWith
}); // addEventListener















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
