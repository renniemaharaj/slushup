import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface RepositorySnapshot {
  repository: string;
  url?: string;
  description?: string | null;
  branch?: string;
  language?: string | null;
  topics?: string[];
  license?: string | null;
  archived?: boolean;
  fetchedAt?: string;
  readme?: string;
  discoveredMedia?: string[];
}

interface Snapshot {
  fetchedAt: string | null;
  repositories: RepositorySnapshot[];
}

const cachePath = new URL('../src/lib/content/github-cache.json', import.meta.url);
const repositories = [
  'renniemaharaj/renniemaharaj',
  'renniemaharaj/go-web-framework',
  'renniemaharaj/aircon',
  'renniemaharaj/chronicle',
  'renniemaharaj/go-api-kit',
  'renniemaharaj/frappe',
  'renniemaharaj/windowsvm',
  'renniemaharaj/superset-docker',
  'renniemaharaj/google-gemini-pool',
  'renniemaharaj/news-go',
  'renniemaharaj/kjv-bible',
  'ystyle/jvms'
];

export function resolveMedia(
  reference: string,
  repository: string,
  branch: string,
  readmePath = 'README.md'
) {
  const rawBase = `https://raw.githubusercontent.com/${repository}/${encodeURIComponent(branch)}/${readmePath}`;
  let url;

  try {
    url = new URL(reference.replaceAll('&amp;', '&'), rawBase);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:') {
    return null;
  }

  if (url.hostname === 'github.com' && url.pathname.includes('/blob/')) {
    url.hostname = 'raw.githubusercontent.com';
    url.pathname = url.pathname.replace('/blob/', '/');
    url.search = '';
  }

  return url.href;
}

export function extractReadmeMedia(readme: string, repository: string, branch: string) {
  const references = new Map<string, string>();
  for (const match of readme.matchAll(/^\s*\[([^\]]+)\]:\s*<?([^\s>]+)>?/gm)) {
    references.set(match[1].toLowerCase(), match[2]);
  }

  const sources = [
    ...Array.from(
      readme.matchAll(/!\[[^\]]*\]\(\s*<?([^\s)>]+)>?(?:\s+[^)]*)?\)/g),
      (match) => match[1]
    ),
    ...Array.from(
      readme.matchAll(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi),
      (match) => match[1]
    ),
    ...Array.from(readme.matchAll(/!\[([^\]]*)\]\[([^\]]*)\]/g), (match) =>
      references.get((match[2] || match[1]).toLowerCase())
    )
  ];

  return [
    ...new Set(
      sources
        .filter((source): source is string => Boolean(source))
        .map((source) => resolveMedia(source, repository, branch))
        .filter((source): source is string => Boolean(source))
    )
  ];
}

export async function synchronize({
  fetcher = fetch,
  destination = cachePath
}: { fetcher?: typeof fetch; destination?: URL } = {}) {
  let previous: Snapshot = { fetchedAt: null, repositories: [] };

  try {
    previous = JSON.parse(await readFile(destination, 'utf8'));
  } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') {
      throw error;
    }
  }

  const normalized = new Map(previous.repositories.map((repo) => [repo.repository, repo]));
  const failures: { repository: string; reason: string; cached: boolean }[] = [];
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'TheWriterCo-portfolio-sync'
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  for (const repository of repositories) {
    try {
      const response = await fetcher(`https://api.github.com/repos/${repository}`, {
        headers,
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) {
        throw new Error(`Metadata HTTP ${response.status}`);
      }

      const meta = await response.json();
      const readmeResponse = await fetcher(`https://api.github.com/repos/${repository}/readme`, {
        headers: { ...headers, Accept: 'application/vnd.github.raw+json' },
        signal: AbortSignal.timeout(15000)
      });
      if (!readmeResponse.ok) {
        throw new Error(`README HTTP ${readmeResponse.status}`);
      }

      const readme = await readmeResponse.text();
      normalized.set(repository, {
        repository,
        url: meta.html_url,
        description: meta.description,
        branch: meta.default_branch,
        language: meta.language,
        topics: meta.topics ?? [],
        license: meta.license?.spdx_id ?? null,
        archived: meta.archived,
        fetchedAt: new Date().toISOString().slice(0, 10),
        readme,
        discoveredMedia: extractReadmeMedia(readme, repository, meta.default_branch)
      });
    } catch (error) {
      failures.push({
        repository,
        reason: error instanceof Error ? error.message : 'Unknown fetch error',
        cached: normalized.has(repository)
      });
    }
  }

  const refreshed = repositories.length - failures.length;
  const next = {
    ...previous,
    fetchedAt: refreshed ? new Date().toISOString().slice(0, 10) : previous.fetchedAt,
    repositories: [...normalized.values()]
  };

  // An interrupted refresh must never replace the last working snapshot.
  await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
  const temporary = new URL(`${destination.href}.tmp`);
  await writeFile(temporary, `${JSON.stringify(next, null, 2)}\n`);
  await rename(temporary, destination);
  return { refreshed, failures };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await synchronize();
  console.log(
    `Refreshed ${result.refreshed} repositories. Presentation content and published media were not changed.`
  );
  for (const failure of result.failures) {
    console.warn(
      `${failure.repository}: ${failure.reason}; ${failure.cached ? 'retained cached content' : 'no cached content available'}.`
    );
  }

  if (result.failures.some((failure) => !failure.cached)) {
    process.exitCode = 1;
  }
}
