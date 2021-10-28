import 'regenerator-runtime';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate, 
} from 'workbox-strategies';
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing';
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

self.skipWaiting();
clientsClaim();

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST;
const revisionVer = 1;
// Precache fallback route and image
WB_MANIFEST.push({
  url: '/',
  revision: revisionVer,
});
precacheAndRoute(WB_MANIFEST);
cleanupOutdatedCaches();
