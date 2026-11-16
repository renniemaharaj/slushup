<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { X, ArrowLeft, ArrowRight } from '@lucide/svelte';
  import Media from './Media.svelte';
  import type { GalleryItem } from '#lib/content/gallery.ts';

  let {
    open = $bindable(false),
    index = $bindable(0),
    items,
    returnFocus
  }: {
    open: boolean;
    index: number;
    items: GalleryItem[];
    returnFocus: HTMLElement | null;
  } = $props();

  const current = $derived(items[index]);

  function move(direction: number) {
    index = (index + direction + items.length) % items.length;
  }

  function keydown(event: KeyboardEvent) {
    if (!open) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  }
</script>

<svelte:window onkeydown={keydown} />

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content
      class="dialog-content lightbox"
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        returnFocus?.focus({ preventScroll: true });
      }}
    >
      <div class="lightbox-top">
        <Dialog.Title class="lightbox-title">The SlushUp gallery</Dialog.Title>
        <span>{String(index + 1).padStart(2, '0')} / {items.length}</span>
        <Dialog.Close class="dialog-close" aria-label="Close gallery"
          ><X size={21} aria-hidden="true" /></Dialog.Close
        >
      </div>
      <Dialog.Description class="sr-only"
        >{current.caption} Use left and right arrow keys to view images. Press Escape to close.</Dialog.Description
      >
      <div class="lightbox-image">
        <Media
          name={current.image}
          alt={current.caption}
          sizes="(min-width: 1000px) 80vw, 95vw"
          fit="contain"
          priority
        />
      </div>
      <div class="lightbox-bottom">
        <p aria-live="polite">{current.caption}</p>
        <div class="lightbox-controls">
          <button class="dialog-close" aria-label="Previous image" onclick={() => move(-1)}
            ><ArrowLeft size={20} aria-hidden="true" /></button
          >
          <button class="dialog-close" aria-label="Next image" onclick={() => move(1)}
            ><ArrowRight size={20} aria-hidden="true" /></button
          >
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.lightbox) {
    inset: 50% auto auto 50%;
    display: flex;
    flex-direction: column;
    width: min(1200px, calc(100% - 2rem));
    max-height: calc(100dvh - 2rem);
    padding: 1.2rem;
    transform: translate(-50%, -50%);
  }

  .lightbox-top {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-bottom: 1rem;
  }

  :global(.lightbox-title) {
    margin-right: auto;
    font-size: var(--text-small);
  }

  .lightbox-top > span {
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  .lightbox-image {
    height: min(65dvh, 800px);
    min-height: 0;
  }

  .lightbox-image :global(picture) {
    background: transparent;
  }

  .lightbox-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1rem;
  }

  .lightbox-bottom p {
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  .lightbox-controls {
    display: flex;
    flex-shrink: 0;
    gap: 0.5rem;
  }

  @media (max-width: 540px) {
    :global(.lightbox) {
      padding: 0.8rem;
    }

    .lightbox-bottom p {
      font-size: var(--text-small);
    }
  }
</style>
