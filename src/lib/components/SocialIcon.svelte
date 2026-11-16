<script lang="ts">
  let { name }: { name: 'instagram' | 'facebook' } = $props();
</script>

<svg
  width="18"
  height="18"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  aria-hidden="true"
>
  {#if name === 'instagram'}
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
  {:else}
    <path
      d="M15 3h-3a4 4 0 0 0-4 4v4H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"
      fill="currentColor"
      stroke="none"
    />
  {/if}
</svg>
