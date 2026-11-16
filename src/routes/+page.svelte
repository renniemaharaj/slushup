<script lang="ts">
  import { onMount } from 'svelte';
  import Hero from '#lib/components/Hero.svelte';
  import FeaturedWork from '#lib/components/FeaturedWork.svelte';
  import Practice from '#lib/components/Practice.svelte';
  import OpenSource from '#lib/components/OpenSource.svelte';
  import About from '#lib/components/About.svelte';
  import SEO from '#lib/components/SEO.svelte';

  let root: HTMLDivElement;

  onMount(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const timer = window.setTimeout(async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 900px)').matches) {
        return;
      }

      try {
        const { initializeMotion } = await import('#lib/motion/page.ts');
        if (disposed) {
          return;
        }

        const dispose = await initializeMotion(root);
        if (disposed) {
          dispose();
        } else {
          cleanup = dispose;
        }
      } catch {
        // Native scrolling and visible content remain available without motion.
      }
    }, 1200);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      cleanup?.();
    };
  });
</script>

<SEO />
<div bind:this={root}>
  <main id="main" tabindex="-1">
    <Hero />
    <FeaturedWork />
    <Practice />
    <OpenSource />
    <About />
  </main>
</div>
