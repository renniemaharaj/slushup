<script lang="ts">
  import { ArrowDown, ArrowUpRight, Network, Layers3, Route } from '@lucide/svelte';
  import type { Project } from '#lib/content/projects.ts';

  let { project, linked = true }: { project: Project; linked?: boolean } = $props();
  const media = $derived(project.media[0]);
  const icon = $derived(project.slug === 'frappe-docker' ? Layers3 : Route);
</script>

{#snippet visual()}
  <div class={`project-visual ${project.accent}`} class:phone={project.slug === 'aircon'}>
    {#if media}
      {#if project.slug === 'aircon'}
        <div class="phone-pair">
          {#each project.media as image}
            <img
              src={image.src}
              width="540"
              height="1208"
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          {/each}
        </div>
        <span class="visual-label"
          ><Network size={15} aria-hidden="true" /> Local connections. Shared Go engine.</span
        >
      {:else}
        <div class="screen-frame">
          <div class="screen-top" aria-hidden="true">
            <span></span><span></span><span></span>
            <p>{project.name}</p>
          </div>
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
            width="1440"
            height={project.slug === 'go-web-framework' ? 1260 : 695}
          />
        </div>
      {/if}
    {:else}
      {@const Icon = icon}
      <div class="architecture">
        <Icon size={32} strokeWidth={1.2} aria-hidden="true" />
        <span class="architecture-heading">{project.name}</span>
        <div class="flow">
          {#each project.flow as item, index}
            <span class="flow-node">{item}</span>
            {#if index < project.flow.length - 1}<ArrowDown size={20} aria-hidden="true" />{/if}
          {/each}
        </div>
        <span class="architecture-caption">Architecture overview</span>
      </div>
    {/if}
    {#if linked}<span class="visual-arrow" aria-hidden="true"><ArrowUpRight size={23} /></span>{/if}
  </div>
{/snippet}

{#if linked}
  <a
    class="visual-link"
    href={`/projects/${project.slug}/`}
    aria-label={`Explore ${project.name} case study`}>{@render visual()}</a
  >
{:else}
  {@render visual()}
{/if}

<style>
  .visual-link {
    display: block;
    min-width: 0;
  }

  .project-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 390px;
    height: 100%;
    padding: clamp(1.5rem, 3.4vw, 3rem);
    overflow: hidden;
    border-radius: var(--radius);
    background: #dce4d8;
  }

  .mint {
    background: #cddbd1;
  }

  .stone {
    background: #e4dfd5;
  }

  .screen-frame {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #20372b26;
    border-radius: 0.6rem;
    box-shadow: 0 18px 40px #122b241a;
    transition: transform 700ms var(--ease);
  }

  .visual-link:hover .screen-frame {
    transform: translateY(-6px);
  }

  .screen-top {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 28px;
    padding-inline: 10px;
    background: #fafaf6;
    border-bottom: 1px solid #dcded2;
  }

  .screen-top > span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #a9b5a9;
  }

  .screen-top p {
    margin: auto;
    padding-right: 25px;
    color: #60645b;
    font-size: 9px;
  }

  .screen-frame > img {
    width: 100%;
    height: auto;
  }

  .phone-pair {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.3rem;
    padding-bottom: 2.3rem;
  }

  .phone-pair > img {
    width: 36%;
    height: auto;
    max-height: 355px;
    object-fit: contain;
    border: 5px solid #10251d;
    border-radius: 1.1rem;
    box-shadow: 0 12px 28px #09231926;
    transform: rotate(-5deg) translateY(-10px);
    transition: transform 700ms var(--ease);
  }

  .phone-pair > img + img {
    transform: rotate(5deg) translateY(15px);
  }

  .visual-link:hover .phone-pair > img {
    transform: rotate(0) translateY(0);
  }

  .visual-label {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    inset: auto auto 1.7rem;
    color: var(--forest);
    font-size: 0.75rem;
  }

  .visual-arrow {
    position: absolute;
    display: grid;
    place-items: center;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    color: var(--forest);
    background: var(--paper);
    border-radius: 50%;
  }

  .architecture {
    display: grid;
    justify-items: center;
    gap: 0.9rem;
    width: 100%;
    text-align: center;
    color: var(--forest);
  }

  .architecture-heading {
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: -0.04em;
  }

  .flow {
    display: grid;
    justify-items: center;
    gap: 0.6rem;
    margin-top: 0.7rem;
    width: 100%;
  }

  .flow-node {
    width: min(100%, 270px);
    padding: 0.9rem;
    background: #fffdf7c7;
    border: 1px solid #082e2220;
    border-radius: 0.7rem;
    font-size: var(--text-small);
    font-weight: 600;
  }

  .architecture-caption {
    margin-top: 0.7rem;
    font-size: 0.75rem;
    color: var(--muted);
  }

  @media (max-width: 700px) {
    .project-visual {
      min-height: 270px;
      padding: 1.8rem;
    }

    .phone {
      min-height: 380px;
    }
  }
</style>
