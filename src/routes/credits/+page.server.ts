import cache from '#lib/content/github-cache.json';

export function load() {
  return { fetchedAt: cache.fetchedAt };
}
