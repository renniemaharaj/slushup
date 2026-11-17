<script lang="ts">
  import { onMount } from 'svelte';
  import {
    ArrowDown,
    ArrowUpRight,
    BookOpen,
    Boxes,
    ChartNoAxesCombined,
    CodeXml,
    Coffee,
    Layers,
    Monitor,
    Network,
    Newspaper,
    Search,
    Sparkles,
    X
  } from '@lucide/svelte';
  import { additionalProjects, projects } from '#lib/content/projects.ts';

  let { currentSlug }: { currentSlug: string } = $props();

  const icons = [Layers, Network, BookOpen, CodeXml, Boxes, Coffee];
  const repositoryIcons = [Monitor, ChartNoAxesCombined, Sparkles, Newspaper, BookOpen];
  const entries = [
    ...projects.map((project, index) => ({
      id: project.slug,
      name: project.name,
      category: project.group,
      description: project.summary,
      technology: project.technologies[0],
      search: `${project.overview} ${project.technologies.join(' ')} ${project.ownership}`,
      href: `/projects/${project.slug}/`,
      destination: project.ownership === 'Contributor' ? 'Contribution' : 'Case study',
      icon: icons[index]
    })),
    ...additionalProjects.map((project, index) => ({
      id: project.repo,
      name: project.name,
      category: project.category,
      description: project.description,
      technology: project.technologies.split(' / ')[0],
      search: `${project.technologies} ${project.status}`,
      href: `https://github.com/renniemaharaj/${project.repo}`,
      destination: 'GitHub repository',
      icon: repositoryIcons[index]
    }))
  ];
  const categories = ['All', 'Applications', 'Systems', 'Infrastructure'];

  let interactive = $state(false);
  let category = $state('All');
  let query = $state('');
  let showAll = $state(false);

  const searchTerm = $derived(query.trim().toLowerCase());
  const filtering = $derived(category !== 'All' || searchTerm.length > 0);
  const matches = $derived(
    entries.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category;
      const searchable = `${project.name} ${project.category} ${project.description} ${project.search}`;

      return matchesCategory && searchable.toLowerCase().includes(searchTerm);
    })
  );
  const visible = $derived(interactive && !filtering && !showAll ? matches.slice(0, 9) : matches);

  onMount(() => {
    interactive = true;
  });

  function resetFilters() {
    category = 'All';
    query = '';
  }
</script>

<section id="all-projects" class="project-explorer" aria-labelledby="all-projects-heading">
  <div class="explorer-heading">
    <div>
      <p class="eyebrow">Keep exploring</p>
      <h2 id="all-projects-heading">All <span class="serif">projects</span></h2>
    </div>
    <p class="lead">
      Applications, systems, and infrastructure I've built, alongside my open-source contributions.
    </p>
  </div>

  {#if interactive}
    <div class="explorer-tools">
      <div class="filters" role="group" aria-label="Filter projects by category">
        {#each categories as option}
          <button
            type="button"
            aria-pressed={category === option}
            aria-controls="project-results"
            onclick={() => (category = option)}
          >
            {option}
            <span
              >({entries.filter((project) => option === 'All' || project.category === option)
                .length})</span
            >
          </button>
        {/each}
      </div>
      <div class="search-field">
        <Search size={18} aria-hidden="true" />
        <label class="sr-only" for="project-search">Search projects</label>
        <input
          id="project-search"
          type="search"
          placeholder="Search projects..."
          bind:value={query}
          aria-controls="project-results"
        />
      </div>
    </div>
    <p class="sr-only" role="status">Showing {visible.length} of {matches.length} projects</p>
  {/if}

  <div id="project-results" class="project-grid">
    {#each visible as project (project.id)}
      {@const Icon = project.icon}
      <a
        class="project-card"
        class:current={project.id === currentSlug}
        href={project.href}
        aria-current={project.id === currentSlug ? 'page' : undefined}
      >
        <div class="card-copy">
          <div class="card-tags">
            <span>{project.category}</span>
            <span>{project.technology}</span>
          </div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <span class="destination">
            {project.id === currentSlug ? 'Current project' : project.destination}
          </span>
        </div>
        <span class="icon-tile" aria-hidden="true"><Icon size={38} strokeWidth={1.5} /></span>
        <ArrowUpRight class="card-arrow" size={19} aria-hidden="true" />
      </a>
    {/each}
  </div>

  {#if !matches.length}
    <div class="empty-state">
      <Search size={26} aria-hidden="true" />
      <h3>No projects found</h3>
      <p>Try a different name, technology, or category.</p>
      <button type="button" onclick={resetFilters}>
        Clear filters <X size={16} aria-hidden="true" />
      </button>
    </div>
  {/if}

  {#if interactive && !filtering}
    <div class="explorer-action">
      <button
        type="button"
        aria-expanded={showAll}
        aria-controls="project-results"
        onclick={() => (showAll = !showAll)}
      >
        {showAll ? 'Show fewer projects' : `View all ${entries.length} projects`}
        <ArrowDown size={17} class={showAll ? 'rotate' : ''} aria-hidden="true" />
      </button>
    </div>
  {/if}
</section>

<style>
  .project-explorer {
    padding-block: clamp(2.5rem, 5vw, 4rem) 1rem;
    border-top: 1px solid var(--line);
  }

  .explorer-heading {
    display: grid;
    grid-template-columns: 0.9fr 1.4fr;
    align-items: end;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .explorer-heading .eyebrow {
    margin-bottom: 0.65rem;
  }

  .explorer-heading .lead {
    max-width: 540px;
    padding-bottom: 0.25rem;
  }

  .explorer-tools {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 44px;
    padding: 0.65rem 1.1rem;
    border: 1px solid #bfc7b7;
    border-radius: 999px;
    color: var(--forest);
    background: transparent;
    font-size: 0.8rem;
    font-weight: 600;
    transition:
      background var(--fast),
      border-color var(--fast);
  }

  button:hover {
    background: #e8eddf;
    border-color: var(--green);
  }

  button[aria-pressed='true'] {
    color: var(--paper);
    background: var(--forest);
    border-color: var(--forest);
  }

  .search-field {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 260px;
    max-width: 100%;
    padding-inline: 1rem;
    border: 1px solid #bfc7b7;
    border-radius: 999px;
  }

  .search-field:focus-within {
    outline: 3px solid var(--green);
    outline-offset: 3px;
  }

  .search-field input {
    width: 100%;
    min-width: 0;
    min-height: 44px;
    padding: 0;
    border: 0;
    outline: none;
    color: var(--ink);
    background: transparent;
    font-size: 0.8rem;
  }

  input::placeholder {
    color: var(--muted);
  }

  .search-field > :global(svg) {
    flex-shrink: 0;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .project-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-width: 0;
    padding: 1.1rem;
    border: 1px solid #cdd2c4;
    border-radius: 1.1rem;
    transition:
      background var(--fast),
      border-color var(--fast);
  }

  .project-card:hover {
    background: #eff3e8;
    border-color: var(--green);
  }

  .project-card.current {
    border-color: #8ba17e;
    background: #f0f4e9;
  }

  .card-copy {
    min-width: 0;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    padding-right: 1rem;
    margin-bottom: 0.65rem;
  }

  .card-tags span {
    padding: 0.1rem 0.5rem;
    border: 1px solid #bfcea9;
    border-radius: 999px;
    font-size: 0.62rem;
    line-height: 1.5;
  }

  .card-tags span:first-child {
    background: #deebcb;
    border-color: transparent;
  }

  h3 {
    margin-bottom: 0.4rem;
    font-size: 1.12rem;
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .card-copy p {
    color: var(--muted);
    font-size: 0.78rem;
    line-height: 1.6;
  }

  .destination {
    display: block;
    margin-top: 0.7rem;
    color: var(--green-dark);
    font-size: 0.65rem;
    font-weight: 600;
  }

  .icon-tile {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 70px;
    height: 76px;
    margin-top: 0.7rem;
    border-radius: 1rem;
    color: var(--green-dark);
    background: linear-gradient(135deg, #edf3e2, #dbe8c8);
  }

  .project-card :global(.card-arrow) {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
  }

  .explorer-action {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .explorer-action button {
    min-width: 210px;
    gap: 1rem;
  }

  :global(.explorer-action .rotate) {
    transform: rotate(180deg);
  }

  .empty-state {
    display: grid;
    justify-items: center;
    gap: 0.8rem;
    padding: 3rem 1rem;
    border: 1px dashed var(--line);
    border-radius: var(--radius);
    text-align: center;
  }

  .empty-state p {
    color: var(--muted);
  }

  @media (max-width: 1100px) {
    .project-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 700px) {
    .explorer-heading {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .search-field {
      width: 100%;
    }

    .project-grid {
      grid-template-columns: 1fr;
    }

    .filters button {
      padding-inline: 0.8rem;
      font-size: 0.75rem;
    }
  }
</style>
