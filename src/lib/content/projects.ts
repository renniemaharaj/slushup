import entries from './projects.json' with { type: 'json' };

export interface ProjectMedia {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  group: string;
  summary: string;
  overview: string;
  problem: string;
  architecture: string;
  technologies: string[];
  highlights: string[];
  considerations: string;
  repo: string;
  status: string;
  license: string;
  ownership: string;
  flow: string[];
  media: ProjectMedia[];
  docs: { label: string; url: string }[];
  accent: string;
}

export const projects: Project[] = entries;

export const additionalProjects = [
  {
    name: 'Windows VM',
    repo: 'windowsvm',
    category: 'Infrastructure',
    description:
      'QEMU/KVM Windows virtualization on Linux, host integration, shared files, and MCP-based automation.',
    status: 'Virtualization toolkit',
    technologies: 'Linux / QEMU / KVM'
  },
  {
    name: 'Superset Docker',
    repo: 'superset-docker',
    category: 'Infrastructure',
    description:
      'A containerized Apache Superset deployment with PostgreSQL, Redis, Nginx, and BigQuery integration.',
    status: 'Deployment configuration',
    technologies: 'Docker / Superset / PostgreSQL'
  },
  {
    name: 'Google Gemini Pool',
    repo: 'google-gemini-pool',
    category: 'Systems',
    description:
      'Concurrent-safe API key pooling, session queues, history management, and retries for Gemini applications.',
    status: 'Go library',
    technologies: 'Go / Channels / Gemini'
  },
  {
    name: 'News-Go',
    repo: 'news-go',
    category: 'Applications',
    description:
      'An experimental concurrent pipeline that retrieves news and uses local models to evaluate it through a Christian framework.',
    status: 'Experiment',
    technologies: 'Go / Local LLMs / Data pipelines'
  },
  {
    name: 'KJV Bible',
    repo: 'kjv-bible',
    category: 'Systems',
    description:
      'A machine-readable Bible corpus with structural validation, rendering metadata, and deterministic integrity checks.',
    status: 'Data & verification tools',
    technologies: 'Python / JSON / SHA-512'
  }
];
