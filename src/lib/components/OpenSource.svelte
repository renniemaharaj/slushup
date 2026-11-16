<script lang="ts">
  import Github from '#lib/components/GithubIcon.svelte';
  import { ArrowUpRight, GitPullRequest, Code2 } from '@lucide/svelte';
  import { additionalProjects } from '#lib/content/projects.ts';
  import { profile } from '#lib/content/profile.ts';

  const categories = ['All projects', 'Applications', 'Systems', 'Infrastructure'];
  let category = $state('All projects');
  const visible = $derived(
    additionalProjects.filter(
      (project) => category === 'All projects' || project.category === category
    )
  );
</script>

<section id="open-source" class="section open-source" aria-labelledby="source-title">
  <div class="container">
    <div class="section-heading" data-reveal>
      <div>
        <p class="eyebrow">Built to be useful. Shared to be reused.</p>
        <h2 id="source-title">
          Open by choice.<br /><span class="serif">Practical by nature.</span>
        </h2>
      </div>
      <div class="source-intro">
        <p class="lead">
          Reusable tools, documented decisions, and contributions to projects beyond my own. There’s
          more to explore in the source.
        </p>
        <a class="text-link" href={profile.github}
          >My GitHub profile <ArrowUpRight size={18} aria-hidden="true" /></a
        >
      </div>
    </div>
    <div class="contribution" data-reveal>
      <span class="contribution-icon"><GitPullRequest size={25} aria-hidden="true" /></span>
      <div>
        <h3>A contribution, not a claim of ownership.</h3>
        <p>
          JVMS is an upstream project maintained by ystyle and its contributors. My merged work
          covers terminal UI, version caching, provider streaming, and platform architecture.
        </p>
      </div>
      <a href="/projects/jvms/" class="text-link"
        >See the contributions <ArrowUpRight size={18} aria-hidden="true" /></a
      >
    </div>
    <div class="project-filter" role="group" aria-label="Filter additional projects">
      {#each categories as name}<button
          aria-pressed={category === name}
          onclick={() => {
            category = name;
          }}>{name}</button
        >{/each}
    </div>
    <p class="sr-only" aria-live="polite">{visible.length} additional projects</p>
    <div class="repository-grid">
      {#each visible as project}
        <a class="repository" href={`https://github.com/renniemaharaj/${project.repo}`}>
          <div class="repository-top">
            <Code2 size={21} strokeWidth={1.4} aria-hidden="true" /><ArrowUpRight
              size={20}
              aria-hidden="true"
            />
          </div>
          <span class="repo-status">{project.status}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <span class="repo-technologies">{project.technologies}</span>
        </a>
      {/each}
      {#if category === 'All projects'}
        <a class="repository all-repos" href={`${profile.github}?tab=repositories`}
          ><Github size={30} aria-hidden="true" />
          <h3>Follow the curiosity.</h3>
          <p>Explore the rest of my public repositories, experiments, and ongoing work.</p>
          <span class="text-link"
            >View all repositories <ArrowUpRight size={18} aria-hidden="true" /></span
          ></a
        >
      {/if}
    </div>
    <p class="license-note">
      The five personal projects featured above have verified MIT licenses. Each repository’s own
      license applies; third-party software and media retain their respective rights. <a
        href="/credits/">Sources &amp; media credits</a
      >
    </p>
  </div>
</section>

<style>
  .open-source {
    background: #ebece2;
  }

  .source-intro {
    max-width: 390px;
  }

  .source-intro .text-link {
    margin-top: 1.3rem;
  }

  .contribution {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.7rem;
    margin-top: 3rem;
    border: 1px solid #cbd3c3;
    border-radius: 1rem;
  }

  .contribution-icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: #d5dfca;
    color: var(--green-dark);
  }

  .contribution > div {
    max-width: 610px;
  }

  .contribution h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .contribution p {
    color: var(--muted);
    font-size: var(--text-small);
  }

  .contribution > a {
    flex-shrink: 0;
    margin-left: auto;
    font-size: 0.8rem;
  }

  .project-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-block: 2.7rem 1.5rem;
  }

  .project-filter button {
    min-height: 44px;
    padding: 0.65rem 1rem;
    color: var(--muted);
    background: transparent;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: var(--text-small);
  }

  .project-filter button[aria-pressed='true'] {
    color: var(--ivory);
    background: var(--forest);
  }

  .project-filter button:hover {
    border-color: #9daa97;
  }

  .repository-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .repository {
    display: flex;
    flex-direction: column;
    align-items: start;
    min-height: 300px;
    padding: 1.8rem;
    background: var(--paper);
    border: 1px solid #d9ded1;
    border-radius: 1rem;
    transition:
      transform var(--normal),
      border-color var(--normal);
  }

  .repository:hover {
    transform: translateY(-4px);
    border-color: var(--green);
  }

  .repository-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1.7rem;
    color: var(--green-dark);
  }

  .repo-status,
  .repo-technologies {
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.7;
  }

  .repository h3 {
    margin-block: 0.4rem 0.8rem;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .repository p {
    margin-bottom: 1.3rem;
    font-size: var(--text-small);
    color: var(--muted);
  }

  .repo-technologies {
    margin-top: auto;
  }

  .all-repos {
    justify-content: center;
    background: #d8e2ce;
    border-color: #d8e2ce;
  }

  .all-repos h3 {
    margin-top: 1.4rem;
  }

  .license-note {
    margin-top: 1.7rem;
    max-width: 800px;
    color: var(--muted);
    font-size: 0.75rem;
  }

  .license-note a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  @media (max-width: 1000px) {
    .contribution {
      align-items: start;
      flex-wrap: wrap;
    }

    .contribution > div {
      flex: 1;
    }

    .contribution > a {
      margin-left: 0;
    }
  }

  @media (max-width: 850px) {
    .repository-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 540px) {
    .repository-grid {
      grid-template-columns: 1fr;
    }

    .repository {
      min-height: 270px;
    }

    .contribution-icon {
      display: none;
    }
  }
</style>
