import { describe, it, expect } from 'vitest';
import { extractReadmeMedia, resolveMedia, synchronize } from '../scripts/sync-github';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

describe('README media normalization', () => {
  it('resolves relative, HTML, reference, blob, attachment, and external images', () => {
    const readme = `![Screen](docs/images/screen.png)
<img src="assets/interface.svg" alt="Architecture">
![Clip][demo]
[demo]: https://github.com/user-attachments/assets/actual-example
![Blob](https://github.com/example/tool/blob/main/media/demo.gif)
![External](https://example.com/image.png)`;
    expect(extractReadmeMedia(readme, 'example/tool', 'main')).toEqual([
      'https://raw.githubusercontent.com/example/tool/main/docs/images/screen.png',
      'https://raw.githubusercontent.com/example/tool/main/media/demo.gif',
      'https://example.com/image.png',
      'https://raw.githubusercontent.com/example/tool/main/assets/interface.svg',
      'https://github.com/user-attachments/assets/actual-example'
    ]);
  });

  it('rejects executable and insecure media URLs', () => {
    expect(resolveMedia('javascript:alert(1)', 'example/tool', 'main')).toBeNull();
    expect(resolveMedia('http://example.com/image.png', 'example/tool', 'main')).toBeNull();
  });
});

it('retains the last working snapshot when GitHub is unavailable', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-cache-'));
  const destination = pathToFileURL(join(directory, 'cache.json'));
  const snapshot = {
    fetchedAt: '2026-11-16',
    repositories: [{ repository: 'renniemaharaj/aircon', description: 'Cached reference' }]
  };

  try {
    await writeFile(destination, JSON.stringify(snapshot));
    const result = await synchronize({
      destination,
      fetcher: async () => {
        throw new Error('Offline');
      }
    });
    expect(result.refreshed).toBe(0);
    expect(
      result.failures.find(
        (item: { repository: string }) => item.repository === 'renniemaharaj/aircon'
      )?.cached
    ).toBe(true);
    expect(JSON.parse(await readFile(destination, 'utf8'))).toEqual(snapshot);
  } finally {
    await rm(directory, { recursive: true });
  }
});
