import { error } from '@sveltejs/kit';
import { projects } from '#lib/content/projects.ts';

export function entries() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function load({ params }: { params: { slug: string } }) {
  const index = projects.findIndex((project) => project.slug === params.slug);
  if (index === -1) {
    error(404, 'Project not found');
  }

  return {
    project: projects[index],
    next: projects[(index + 1) % projects.length]
  };
}
