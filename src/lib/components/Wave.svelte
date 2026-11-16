<script lang="ts">
  let { color = 'var(--ivory)', layered = false }: { color?: string; layered?: boolean } = $props();
</script>

<svg
  class="wave"
  viewBox="0 0 1440 100"
  preserveAspectRatio="none"
  aria-hidden="true"
  style:--wave-color={color}
>
  {#if layered}
    <path class="wave-back" d="M0 48C240 145 425 5 750 36S1190 130 1440 20V100H0Z" />
  {/if}
  <path d="M0 65C250 160 425 20 740 55S1200 100 1440 35V100H0Z" />
</svg>

<style>
  .wave {
    position: absolute;
    inset: auto 0 -1px;
    width: 100%;
    height: clamp(35px, 6vw, 90px);
    fill: var(--wave-color);
    pointer-events: none;
  }

  .wave-back {
    opacity: 0.35;
  }
</style>
