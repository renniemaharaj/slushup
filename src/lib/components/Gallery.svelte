<script lang="ts">
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/state';
  import { Plus, ArrowUpRight } from '@lucide/svelte';
  import Media from './Media.svelte';
  import Button from './Button.svelte';
  import { albums, filterGallery, parseAlbum, type Album } from '#lib/content/gallery.ts';
  import type LightboxComponent from './Lightbox.svelte';

  let expanded = $state(false);
  let reducedMotion = $state(true);
  let selectedIndex = $state(0);
  let lightboxOpen = $state(false);
  let Lightbox = $state<typeof LightboxComponent | null>(null);
  let returnFocus = $state<HTMLElement | null>(null);
  let loadingLightbox = $state(false);
  let activeAlbum = $state<Album>('all');

  afterNavigate(() => {
    activeAlbum = parseAlbum(new URL(window.location.href).searchParams.get('album'));
  });
  const filtered = $derived(filterGallery(activeAlbum));
  const visible = $derived(expanded ? filtered : filtered.slice(0, 6));

  onMount(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = query.matches;
    const update = () => (reducedMotion = query.matches);
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  });

  async function changeAlbum(album: Album) {
    const url = new URL(page.url.href);
    if (album === 'all') {
      url.searchParams.delete('album');
    } else {
      url.searchParams.set('album', album);
    }

    expanded = false;
    await goto(url, { shallow: true, replace: true, reset: false });
  }

  async function showImage(event: MouseEvent, index: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    returnFocus = event.currentTarget as HTMLElement;
    selectedIndex = index;
    loadingLightbox = true;

    try {
      Lightbox = (await import('./Lightbox.svelte')).default;
      lightboxOpen = true;
    } finally {
      loadingLightbox = false;
    }
  }
</script>

<section id="gallery" class="gallery section dark" aria-labelledby="gallery-title">
  <div class="container">
    <div class="gallery-heading">
      <div>
        <p class="eyebrow">Real events. Real SlushUp.</p>
        <h2 id="gallery-title">Moments we create.</h2>
        <p class="lead">A little glimpse of the good times.</p>
      </div>
      <a
        href="https://www.instagram.com/slushuptt?igsh=MWc4NGFzMHpxazJ3aQ=="
        class="instagram-link"
        target="_blank"
        rel="noopener noreferrer"
        >Follow the celebration <ArrowUpRight size={18} aria-hidden="true" /></a
      >
    </div>
    <div class="gallery-filters" role="group" aria-label="Filter gallery">
      {#each albums as album}
        <a
          href={`?${album.key === 'all' ? '' : `album=${album.key}`}#gallery`}
          class:chosen={activeAlbum === album.key}
          aria-current={activeAlbum === album.key ? 'true' : undefined}
          onclick={(event) => {
            event.preventDefault();
            changeAlbum(album.key);
          }}>{album.label}</a
        >
      {/each}
    </div>
    <div class="gallery-grid" aria-busy={loadingLightbox}>
      {#each visible as item, index (item.id)}
        <a
          animate:flip={{ duration: reducedMotion ? 0 : 350 }}
          href={`/${item.image}`}
          class="gallery-item"
          aria-label={`View photo: ${item.caption}`}
          onclick={(event) => showImage(event, index)}
        >
          <Media name={item.image} alt={item.caption} sizes="(min-width: 900px) 33vw, 50vw" />
          <div class="gallery-shade"></div>
          <span class="gallery-caption">{item.caption}</span>
          <span class="expand-icon"><Plus size={20} aria-hidden="true" /></span>
        </a>
      {/each}
    </div>
    <div class="gallery-bottom">
      <p aria-live="polite">{visible.length} of {filtered.length} moments</p>
      {#if filtered.length > 6}
        <Button variant="outline" onclick={() => (expanded = !expanded)}>
          {expanded ? 'Show Fewer Moments' : 'Explore the Full Gallery'}
        </Button>
      {/if}
      <span class="gallery-note">Made to be remembered.</span>
    </div>
  </div>
</section>

{#if Lightbox}
  <Lightbox bind:open={lightboxOpen} bind:index={selectedIndex} items={filtered} {returnFocus} />
{/if}

<style>
  .gallery {
    position: relative;
    background: radial-gradient(ellipse at 100% 10%, var(--forest-light), var(--forest-deep) 65%);
  }

  .gallery-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
  }

  .lead {
    margin-top: 1rem;
  }

  .instagram-link {
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--line-dark);
    font-size: var(--text-small);
  }

  .gallery-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 2.2rem;
    margin-bottom: 1.8rem;
  }

  .gallery-filters a {
    display: grid;
    place-items: center;
    min-height: 44px;
    padding: 0.6rem 1.3rem;
    color: var(--on-dark);
    border: 1px solid var(--line-dark);
    border-radius: 999px;
    font-size: var(--text-small);
    transition:
      background var(--fast),
      color var(--fast);
  }

  .gallery-filters a:hover,
  .gallery-filters .chosen {
    color: var(--forest);
    background: var(--lime);
    border-color: var(--lime);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr 1fr;
    grid-auto-rows: 270px;
    gap: 1rem;
  }

  .gallery-item {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 1rem;
    isolation: isolate;
  }

  .gallery-item:nth-child(6n + 1) {
    grid-row: span 2;
  }

  .gallery-item:nth-child(6n + 4) {
    grid-column: span 2;
  }

  .gallery-item:nth-child(6n + 6) {
    grid-column: span 2;
  }

  .gallery-item :global(picture) {
    transition: transform 700ms var(--ease);
  }

  .gallery-item:hover :global(picture) {
    transform: scale(1.04);
  }

  .gallery-shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, var(--forest-deep), transparent 65%);
    opacity: 0.7;
  }

  .gallery-caption {
    position: absolute;
    inset: auto 4rem 1.4rem 1.4rem;
    font-size: var(--text-small);
    line-height: 1.6;
  }

  .expand-icon {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: grid;
    place-items: center;
    width: 35px;
    height: 35px;
    color: var(--forest);
    background: var(--ivory);
    border-radius: 50%;
  }

  .gallery-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;
  }

  .gallery-bottom p {
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  .gallery-note {
    color: var(--on-dark);
    font-family: Georgia, serif;
    font-size: var(--text-body);
    font-style: italic;
  }

  @media (min-width: 1600px) {
    .gallery-grid {
      grid-auto-rows: 300px;
    }
  }

  @media (max-width: 900px) {
    .gallery-grid {
      grid-auto-rows: 220px;
    }

    .gallery-note {
      display: none;
    }
  }

  @media (max-width: 540px) {
    .gallery-heading {
      display: block;
    }

    .instagram-link {
      margin-top: 1.5rem;
    }

    .gallery-filters {
      gap: 0.4rem;
      justify-content: space-between;
    }

    .gallery-filters a {
      padding-inline: 0.85rem;
      font-size: var(--text-small);
    }

    .gallery-grid {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 215px;
      gap: 0.65rem;
    }

    .gallery-item:nth-child(n) {
      grid-row: auto;
      grid-column: auto;
    }

    .gallery-item:nth-child(6n + 1) {
      grid-column: span 2;
      aspect-ratio: 1.7;
    }

    .gallery-item:nth-child(6n + 6) {
      grid-column: span 2;
    }

    .gallery-caption {
      inset: auto 0.8rem 3.1rem;
      font-size: var(--text-small);
    }

    .expand-icon {
      bottom: 0.6rem;
      right: 0.6rem;
      width: 29px;
      height: 29px;
    }

    .gallery-bottom {
      flex-direction: column-reverse;
      gap: 1.2rem;
    }
  }
</style>
