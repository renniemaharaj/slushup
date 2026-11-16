<script lang="ts">
  import { ArrowUpRight, LoaderCircle } from '@lucide/svelte';
  import type { Component, Snippet } from 'svelte';

  let {
    href,
    variant = 'primary',
    size = 'medium',
    leading,
    arrow = true,
    disabled = false,
    loading = false,
    onclick,
    children,
    class: className = '',
    label,
    type = 'button'
  }: {
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'small' | 'medium' | 'large';
    leading?: Component<{ size?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>;
    arrow?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onclick?: (event: MouseEvent) => void;
    children: Snippet;
    class?: string;
    label?: string;
    type?: 'button' | 'submit' | 'reset';
  } = $props();
</script>

{#snippet content()}
  {#if loading}
    <LoaderCircle size={17} aria-hidden="true" class="spinner" />
  {:else if leading}
    {@const Icon = leading}
    <Icon size={17} aria-hidden="true" />
  {/if}
  <span>{@render children()}</span>
  {#if arrow && !loading}
    <ArrowUpRight size={17} aria-hidden="true" />
  {/if}
{/snippet}

{#if href}
  <a
    href={disabled || loading ? undefined : href}
    class={`button ${variant} ${size} ${className}`}
    aria-disabled={disabled || loading || undefined}
    aria-busy={loading || undefined}
    aria-label={label}
    tabindex={disabled ? -1 : undefined}
    {onclick}
  >
    {@render content()}
  </a>
{:else}
  <button
    {type}
    class={`button ${variant} ${size} ${className}`}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    aria-label={label}
    {onclick}
  >
    {@render content()}
  </button>
{/if}

<style>
  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 1.3rem;
    min-height: 48px;
    padding: 0.9rem 1.5rem;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: var(--text-small);
    font-weight: 800;
    line-height: 1.4;
    text-align: center;
    transition:
      background var(--fast),
      transform var(--fast),
      border-color var(--fast);
  }

  .button:hover {
    transform: translateY(-2px);
  }

  .button:active {
    transform: translateY(0);
  }

  .primary {
    color: var(--white);
    background: var(--green);
  }

  .primary:hover {
    background: var(--green-dark);
  }

  .secondary {
    color: var(--forest);
    background: var(--lime);
  }

  .secondary:hover {
    background: var(--ivory);
  }

  .outline {
    color: inherit;
    background: transparent;
    border-color: currentColor;
  }

  .outline:hover {
    background: var(--glass);
  }

  .text {
    color: inherit;
    padding-inline: 0;
    background: transparent;
  }

  .small {
    min-height: 44px;
    padding: 0.7rem 1.2rem;
    font-size: var(--text-small);
  }

  .large {
    min-height: 54px;
    padding: 1rem 1.8rem;
  }

  .button:disabled,
  [aria-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }

  :global(.spinner) {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
