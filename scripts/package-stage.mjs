import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

await stat('build/index.html');
await mkdir('artifacts', { recursive: true });
const archive = 'artifacts/slushup-staging.tar.gz';
execFileSync('tar', ['-czf', archive, '-C', 'build', '.']);
const digest = createHash('sha256')
  .update(await readFile(archive))
  .digest('hex');
await writeFile(`${archive}.sha256`, `${digest}  slushup-staging.tar.gz\n`);
console.log(`${archive}\nSHA256: ${digest}`);
