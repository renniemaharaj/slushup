<script lang="ts">
  import { getImage } from '#lib/content/media.ts';

  let {
    name,
    alt,
    sizes = '(min-width: 900px) 40vw, 100vw',
    priority = false,
    fit = 'cover',
    position = 'center',
    class: className = ''
  }: {
    name: string;
    alt: string;
    sizes?: string;
    priority?: boolean;
    fit?: 'cover' | 'contain';
    position?: string;
    class?: string;
  } = $props();

  const source = $derived(getImage(name));
</script>

<picture class={className} style:--fit={fit} style:--position={position}>
  {#each Object.entries(source.sources) as [format, srcset]}
    <source type={`image/${format}`} {srcset} {sizes} />
  {/each}
  <img
    src={source.img.src}
    width={source.img.w}
    height={source.img.h}
    {alt}
    {sizes}
    loading={priority ? 'eager' : 'lazy'}
    fetchpriority={priority ? 'high' : 'auto'}
    decoding="async"
  />
</picture>

<style>
  picture {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--forest-light);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: var(--fit);
    object-position: var(--position);
  }
</style>
