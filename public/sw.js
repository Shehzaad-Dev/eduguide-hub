// Monetag Service Worker Configuration
// This service worker is required for Monetag ad network integration

self.options = {
    "domain": "5gvci.com",
    "zoneId": 11076770
}

self.lary = ""

// Import Monetag's service worker script
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')
