<script lang="ts">
  import Github from '#lib/components/GithubIcon.svelte';
  import { ArrowLeft, ArrowUpRight, Check } from '@lucide/svelte';
  import SEO from '#lib/components/SEO.svelte';
  import ProjectVisual from '#lib/components/ProjectVisual.svelte';
  import Button from '#lib/components/Button.svelte';
  import { profile } from '#lib/content/profile.ts';
  import type { Project } from '#lib/content/projects.ts';

  let { data }: { data: { project: Project; next: Project } } = $props();
  const project = $derived(data.project);
  const source = $derived(`https://github.com/${project.repo}`);
</script>

<SEO
  title={`${project.name} | Engineering work by Rennie Maharaj`}
  description={project.overview}
  path={`/projects/${project.slug}/`}
  structuredData={{
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.overview,
    url: `${profile.origin}/projects/${project.slug}/`,
    codeRepository: source,
    contributor: { '@type': 'Person', name: profile.name, url: profile.origin }
  }}
/>
<main id="main" class="case-study" tabindex="-1">
  <div class="container">
    <a class="back-link" href="/#work"
      ><ArrowLeft size={17} aria-hidden="true" /> Back to selected work</a
    >
    <div class="case-heading">
      <div>
        <p class="eyebrow">{project.category}</p>
        <h1>{project.name}</h1>
        <p class="case-summary">{project.summary}</p>
      </div>
      <div class="case-meta">
        <span>{project.ownership}</span><span>{project.status}</span><span
          >{project.license} license</span
        >
      </div>
    </div>
    <ProjectVisual {project} linked={false} />
    {#if project.media.length}<p class="media-caption">
        {project.media[0].caption}
        {#if project.slug === 'chronicle'}<a href="https://www.openstreetmap.org/copyright"
            >OpenStreetMap attribution</a
          >{/if}
      </p>{/if}
    <div class="case-content">
      <aside>
        <p class="eyebrow">At a glance</p>
        <ul class="tags">
          {#each project.technologies as technology}<li>{technology}</li>{/each}
        </ul>
        <Button href={source} leading={Github} variant="outline">View source</Button><a
          class="text-link"
          href="/credits/"
          >Sources &amp; media credits <ArrowUpRight size={16} aria-hidden="true" /></a
        >
      </aside>
      <div class="case-narrative">
        <section aria-labelledby="overview">
          <h2 id="overview">The overview</h2>
          <p>{project.overview}</p>
        </section>
        <section aria-labelledby="problem">
          <h2 id="problem">The problem</h2>
          <p>{project.problem}</p>
        </section>
        <section aria-labelledby="architecture">
          <h2 id="architecture">How it fits together</h2>
          <p>{project.architecture}</p>
          <ol class="architecture-flow">
            {#each project.flow as step}<li>{step}</li>{/each}
          </ol>
        </section>
        <section aria-labelledby="implementation">
          <h2 id="implementation">Implementation highlights</h2>
          <ul class="highlights">
            {#each project.highlights as highlight}<li>
                <Check size={19} aria-hidden="true" />
                <p>{highlight}</p>
              </li>{/each}
          </ul>
        </section>
        <section aria-labelledby="considerations">
          <h2 id="considerations">Engineering considerations</h2>
          <p>{project.considerations}</p>
        </section>
        {#each project.media.slice(1) as image}<figure>
            <img src={image.src} alt={image.alt} loading="lazy" width="1440" height="900" />
            <figcaption>
              {image.caption}
              {#if project.slug === 'chronicle'}<a href="https://www.openstreetmap.org/copyright"
                  >OpenStreetMap attribution</a
                >{/if}
            </figcaption>
          </figure>{/each}
        <section aria-labelledby="documentation">
          <h2 id="documentation">Go deeper</h2>
          <div class="documentation">
            <a href={source}>Source repository<ArrowUpRight size={18} aria-hidden="true" /></a
            >{#each project.docs as doc}<a href={doc.url}
                >{doc.label}<ArrowUpRight size={18} aria-hidden="true" /></a
              >{/each}
          </div>
        </section>
      </div>
    </div>
    <a class="next-project" href={`/projects/${data.next.slug}/`}
      ><span
        ><span class="eyebrow">Next project</span><span class="next-name">{data.next.name}</span
        ></span
      ><ArrowUpRight size={40} strokeWidth={1.2} aria-hidden="true" /></a
    >
  </div>
</main>

<style>
  .case-study {
    padding-block: 9rem 4rem;
    background: var(--paper);
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    color: var(--muted);
    font-size: var(--text-small);
  }

  .case-heading {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    padding-block: 3rem;
    align-items: end;
  }

  h1 {
    font-size: clamp(3rem, 6vw, 5.8rem);
    font-weight: 500;
  }

  .case-summary {
    margin-top: 1.2rem;
    max-width: 620px;
    color: var(--muted);
    font-size: clamp(1.1rem, 1.7vw, 1.4rem);
  }

  .case-meta {
    display: grid;
    gap: 0.65rem;
    padding-bottom: 0.6rem;
    flex-shrink: 0;
    color: var(--muted);
    font-size: var(--text-small);
  }

  .case-study :global(.project-visual) {
    max-height: 700px;
    padding: clamp(1.5rem, 4vw, 4rem) 8%;
  }

  .case-study :global(.screen-frame) {
    max-width: 1000px;
  }

  .case-study :global(.screen-frame > img) {
    max-height: 570px;
    object-fit: contain;
  }

  .media-caption {
    margin-top: 0.8rem;
    color: var(--muted);
    font-size: 0.75rem;
  }

  .media-caption a,
  figcaption a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .case-content {
    display: grid;
    grid-template-columns: 0.7fr 1.7fr;
    gap: clamp(2rem, 7vw, 7rem);
    padding-block: 4rem;
  }

  aside {
    position: sticky;
    top: 9rem;
    align-self: start;
  }

  aside .tags {
    margin-bottom: 1.7rem;
  }

  aside > a {
    margin-top: 1.2rem;
    font-size: 0.75rem;
  }

  .case-narrative {
    display: grid;
    gap: 2.7rem;
    max-width: 760px;
  }

  .case-narrative h2 {
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .case-narrative p {
    color: var(--muted);
  }

  .architecture-flow {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin: 1.3rem 0 0;
    padding: 0;
    list-style-position: inside;
  }

  .architecture-flow li {
    padding: 0.8rem;
    border: 1px solid var(--line);
    border-radius: 0.5rem;
    font-size: var(--text-small);
  }

  .highlights {
    display: grid;
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  .highlights li {
    display: flex;
    align-items: start;
    gap: 0.75rem;
  }

  .highlights :global(svg) {
    flex-shrink: 0;
    color: var(--green-dark);
    margin-top: 0.35rem;
  }

  figure {
    margin: 0;
  }

  figure img {
    width: 100%;
    height: auto;
    max-height: 650px;
    object-fit: contain;
    border: 1px solid var(--line);
    border-radius: 0.6rem;
  }

  figcaption {
    margin-top: 0.8rem;
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.8;
  }

  .documentation {
    display: grid;
  }

  .documentation a {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 1rem;
    border-bottom: 1px solid var(--line);
    font-size: var(--text-small);
  }

  .next-project {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-block: 2.5rem;
    border-top: 1px solid var(--line);
  }

  .next-name {
    font-size: clamp(2rem, 4vw, 3rem);
    letter-spacing: -0.045em;
  }

  @media (max-width: 700px) {
    .case-study {
      padding-top: 7rem;
    }

    .case-heading {
      display: grid;
      padding-block: 2rem;
    }

    .case-meta {
      display: flex;
      flex-wrap: wrap;
      font-size: 0.75rem;
    }

    .case-meta span + span::before {
      content: '·';
      margin-right: 0.6rem;
    }

    .case-content {
      grid-template-columns: 1fr;
      padding-top: 2.5rem;
    }

    aside {
      position: static;
    }
  }
</style>
