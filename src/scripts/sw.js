import 'regenerator-runtime';

import { clientsClaim } from 'workbox-core';
// import { ExpirationPlugin } from 'workbox-expiration';
import {
  NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate, 
} from 'workbox-strategies';
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import CONFIG from './config/config';

clientsClaim();

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST;
const revisionVer = 5;
// Precache fallback route and image
WB_MANIFEST.push({
  url: '/',
  revision: revisionVer,
});

const precache = [...WB_MANIFEST];

WB_MANIFEST.forEach((precacheRoute) => {
  if (precacheRoute.url.match(/images\/[\w\d\-.]+\.(jpe?g|png)/i)) {
    const ext = precacheRoute.url.match(/\.(jpe?g|png)/i)?.[0];
    precache.push(
      { url: precacheRoute.url.replace(ext, `-small${ext}`), revision: revisionVer },
      { url: precacheRoute.url.replace(ext, `-large${ext}`), revision: revisionVer },
      { url: precacheRoute.url.replace(ext, '-small.webp'), revision: revisionVer },
      { url: precacheRoute.url.replace(ext, '-large.webp'), revision: revisionVer },
    );
  }
});

precacheAndRoute(precache);

// Cache App Shell
registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'start-url',
  }),
  'GET',
);

// Cache the rest
registerRoute(
  /\/#\/restaurant\/[\d\w]+/i,
  new NetworkFirst({
    cacheName: 'restaurant-detail',
  }),
  'GET',
);

// Cache google fonts cdn
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: 'google-fonts',
  }),
  'GET',
);

// Cache web fonts
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
  new CacheFirst({
    cacheName: 'static-font-assets',
  }),
  'GET',
);

// Cache Image CDN Response
registerRoute(
  ({ url }) => url.origin === CONFIG.BASE_CDN_URL.replace(/\/$/i, '')
  && url.pathname.startsWith('/images/'),
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// Cache Fetch API Response
registerRoute(
  ({ url }) => url.origin === CONFIG.BASE_URL.replace(/\/$/i, '')
  && !url.pathname.startsWith('/images/'),
  new NetworkFirst({
    cacheName: 'fetch-api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
