<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '#lib/components/Header.svelte';
  import Hero from '#lib/components/Hero.svelte';
  import Experience from '#lib/components/Experience.svelte';
  import Services from '#lib/components/Services.svelte';
  import Occasions from '#lib/components/Occasions.svelte';
  import Gallery from '#lib/components/Gallery.svelte';
  import Benefits from '#lib/components/Benefits.svelte';
  import Booking from '#lib/components/Booking.svelte';
  import Footer from '#lib/components/Footer.svelte';
  import { business } from '#lib/content/business.ts';
  import { homeSEO, homeStructuredData } from '#lib/content/seo.ts';

  let root: HTMLDivElement;
  let solidHeader = $state(false);

  onMount(() => {
    const sentinel = root.querySelector('#header-sentinel');
    const observer = new IntersectionObserver(([entry]) => (solidHeader = !entry.isIntersecting));
    if (sentinel) {
      observer.observe(sentinel);
    }

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
        // Content and native scrolling remain usable if enhancement fails.
      }
    }, 1200);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      observer.disconnect();
      cleanup?.();
    };
  });
</script>

<svelte:head>
  <title>{homeSEO.title}</title>
  <meta name="description" content={homeSEO.description} />
  <meta name="author" content={business.name} />
  <meta
    name="robots"
    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  />
  <link rel="canonical" href={homeSEO.canonical} />
  <link
    rel="preload"
    href="/fonts/manrope-latin-variable.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={business.name} />
  <meta property="og:locale" content={homeSEO.locale} />
  <meta property="og:title" content={homeSEO.title} />
  <meta property="og:description" content={homeSEO.description} />
  <meta property="og:url" content={homeSEO.canonical} />
  <meta property="og:image" content={homeSEO.image.url} />
  <meta property="og:image:secure_url" content={homeSEO.image.url} />
  <meta property="og:image:type" content={homeSEO.image.type} />
  <meta property="og:image:width" content={String(homeSEO.image.width)} />
  <meta property="og:image:height" content={String(homeSEO.image.height)} />
  <meta property="og:image:alt" content={homeSEO.image.alt} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={homeSEO.title} />
  <meta name="twitter:description" content={homeSEO.description} />
  <meta name="twitter:image" content={homeSEO.image.url} />
  <meta name="twitter:image:alt" content={homeSEO.image.alt} />
  {@html `<script type="application/ld+json">${JSON.stringify(homeStructuredData).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<div bind:this={root}>
  <div id="header-sentinel" aria-hidden="true"></div>
  <Header solid={solidHeader} />
  <main id="main" tabindex="-1">
    <Hero />
    <Experience />
    <Services />
    <Occasions />
    <Gallery />
    <Benefits />
    <Booking />
  </main>
  <Footer />
</div>

<style>
  #header-sentinel {
    position: absolute;
    top: 0;
    height: 100px;
    width: 1px;
    pointer-events: none;
  }

  main:focus {
    outline: none;
  }
</style>
