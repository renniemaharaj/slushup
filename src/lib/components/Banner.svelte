<script lang="ts">
  import { X } from '@lucide/svelte';
  import { fly } from 'svelte/transition';
  import type { Snippet } from 'svelte';

  let {
    variant,
    label,
    leading,
    actions,
    children,
    onactivate,
    ondismiss,
    reducedMotion = false
  }: {
    variant: 'promotion' | 'cookie';
    label: string;
    leading?: Snippet;
    actions?: Snippet;
    children: Snippet;
    onactivate?: () => void;
    ondismiss?: () => void;
    reducedMotion?: boolean;
  } = $props();
</script>

<section
  class="banner {variant} dark"
  aria-label={label}
  transition:fly|global={{ y: -8, duration: reducedMotion ? 0 : 280, opacity: 1 }}
>
  {#if onactivate}
    <button class="surface-action" aria-label={`Open ${label}`} onclick={onactivate}></button>
  {/if}
  {#if leading}<div class="banner-leading">{@render leading()}</div>{/if}
  <div class="banner-content">{@render children()}</div>
  {#if actions}<div class="banner-actions">{@render actions()}</div>{/if}
  {#if ondismiss}
    <button class="dismiss" aria-label={`Dismiss ${label}`} onclick={ondismiss}>
      <X size={21} aria-hidden="true" />
    </button>
  {/if}
</section>

<style>
  .banner {
    position: relative;
    flex-shrink: 0;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 1rem;
    min-height: 80px;
    padding: 0.7rem 1.1rem;
    border: 1px solid #c1ed7759;
    border-radius: 999px;
    background: linear-gradient(115deg, #041e17f5, #174a35ed 55%, #041e17f5);
    box-shadow: 0 8px 30px #041e171a;
    backdrop-filter: blur(18px);
  }

  .promotion {
    grid-template-columns: auto minmax(0, 1fr) auto auto;
  }
  .cookie {
    border-color: #f5f1e875;
  }
  .banner-leading {
    position: relative;
    pointer-events: none;
  }
  .banner-content {
    position: relative;
    min-width: 0;
  }
  .promotion .banner-content {
    pointer-events: none;
  }
  .banner-actions {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  .surface-action {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: inherit;
    background: transparent;
  }

  .surface-action:hover {
    background: #c1ed7708;
  }
  .surface-action:focus-visible {
    outline-offset: -5px;
  }

  .dismiss {
    position: relative;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    color: var(--ivory);
    border: 0;
    border-radius: 50%;
    background: transparent;
  }

  .dismiss:hover {
    background: var(--glass);
  }

  @media (max-width: 900px) {
    .banner {
      gap: 0.6rem;
      padding: 0.8rem 1rem;
      border-radius: 1.4rem;
    }
    .banner-actions {
      grid-column: 2 / -1;
    }
    .promotion {
      grid-template-columns: auto minmax(0, 1fr) 44px;
    }
    .cookie {
      grid-template-columns: auto minmax(0, 1fr);
    }
    .dismiss {
      grid-column: 3;
      grid-row: 1;
    }
  }

  @media (max-width: 540px) {
    .banner {
      padding: 0.7rem;
      gap: 0.5rem;
    }
    .banner-actions {
      grid-column: 1 / -1;
    }
    .banner-actions :global(.button) {
      min-height: 44px;
      padding: 0.55rem 0.65rem;
      font-size: 0.75rem;
      gap: 0.5rem;
    }
  }
</style>
