import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 }); // default TTL: 60 seconds

export function getFromCache(key) {
  return cache.get(key);
}

export function saveToCache(key, value, ttl = 60) {
  cache.set(key, value, ttl);
}
