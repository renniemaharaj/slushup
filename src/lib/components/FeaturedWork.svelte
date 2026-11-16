<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';
  import { projects } from '#lib/content/projects.ts';
  import ProjectVisual from './ProjectVisual.svelte';
</script>

<section id="work" class="section work" aria-labelledby="work-title">
  <div class="container">
    <div class="section-heading" data-reveal>
      <div>
        <p class="eyebrow">Selected engineering work</p>
        <h2 id="work-title">Different problems.<br /><span class="serif">The same care.</span></h2>
      </div>
      <p class="lead">
        From connected applications to the systems underneath them. A closer look at what I build,
        how it works, and the decisions behind it.
      </p>
    </div>
    <div class="project-list">
      {#each projects as project, index}
        <article class="project" class:reverse={index % 2 === 1} data-reveal>
          <ProjectVisual {project} />
          <div class="project-story">
            <p class="project-category">{project.category}</p>
            <div class="project-title">
              <h3>{project.name}</h3>
              <span class="status"
                >{project.ownership === 'Contributor' ? 'Contributor' : project.status}</span
              >
            </div>
            <p class="project-summary">{project.summary}</p>
            <p class="lead">{project.overview}</p>
            <ul class="tags" aria-label={`${project.name} technologies`}>
              {#each project.technologies.slice(0, 5) as technology}<li>{technology}</li>{/each}
            </ul>
            <a class="text-link" href={`/projects/${project.slug}/`}
              >Inside the project <ArrowUpRight size={18} aria-hidden="true" /></a
            >
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .work {
    background: var(--paper);
  }

  .section-heading .lead {
    max-width: 390px;
  }

  .project-list {
    display: grid;
    gap: clamp(3rem, 6vw, 6rem);
    margin-top: 4rem;
  }

  .project {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
    gap: clamp(2rem, 5vw, 5rem);
  }

  .project.reverse {
    grid-template-columns: 1fr 1.2fr;
  }

  .reverse .project-story {
    grid-column: 1;
    grid-row: 1;
  }

  .project-category {
    margin-bottom: 1.1rem;
    color: var(--green-dark);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .project-title h3 {
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    font-weight: 600;
  }

  .status {
    display: inline-block;
    margin-top: 0.6rem;
    color: var(--muted);
    font-size: 0.75rem;
  }

  .project-summary {
    margin-block: 1.2rem 0.8rem;
    font-size: clamp(1.1rem, 1.6vw, 1.35rem);
    line-height: 1.5;
    letter-spacing: -0.025em;
  }

  .tags {
    margin-block: 1.4rem 1.8rem;
  }

  @media (max-width: 800px) {
    .project,
    .project.reverse {
      grid-template-columns: 1fr;
      gap: 1.7rem;
    }

    .reverse .project-story {
      grid-column: auto;
      grid-row: auto;
    }

    .project-list {
      gap: 3.5rem;
      margin-top: 2.5rem;
    }
  }
</style>
