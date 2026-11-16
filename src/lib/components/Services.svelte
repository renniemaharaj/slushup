<script lang="ts">
  import type { EmblaCarouselType } from 'embla-carousel';
  import { ArrowLeft, ArrowRight } from '@lucide/svelte';
  import ServiceCard from './ServiceCard.svelte';
  import Wave from './Wave.svelte';
  import { services } from '#lib/content/services.ts';
  import { carousel } from '#lib/motion/carousel.ts';

  let api = $state<EmblaCarouselType>();
  let selected = $state(0);
  let canGoBack = $state(false);
  let canGoForward = $state(false);

  function ready(instance: EmblaCarouselType) {
    api = instance;

    function syncControls() {
      selected = instance.selectedScrollSnap();
      canGoBack = instance.canScrollPrev();
      canGoForward = instance.canScrollNext();
    }

    syncControls();
    instance.on('select', syncControls);
    instance.on('reInit', syncControls);
  }
</script>

<section id="services" class="services section dark" aria-labelledby="services-title">
  <svg class="top-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"
    ><path d="M0 0H1440V10C1190 85 980 15 740 35S270 80 0 15Z" /></svg
  >
  <div class="container">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Our services</p>
        <h2 id="services-title">Exceptional drinks.<br />Every kind of celebration.</h2>
      </div>
      <p class="lead">
        From the first pour to the final toast.<br />Your complete beverage experience, beautifully
        served.
      </p>
    </div>
    <div
      class="services-viewport"
      use:carousel={{
        media: '(max-width: 900px)',
        options: {
          align: 'start',
          duration: 20,
          watchSlides: false,
          breakpoints: { '(min-width: 901px)': { active: false } }
        },
        onready: ready
      }}
      aria-label="Our services"
    >
      <div class="services-track">
        {#each services as service}
          <div class="service-slide"><ServiceCard {service} /></div>
        {/each}
      </div>
    </div>
    <div class="service-controls">
      <span>0{selected + 1}{' '}<i>/ 04</i></span>
      <div>
        <button
          aria-label="Previous service"
          disabled={!canGoBack}
          onclick={() => api?.scrollPrev()}><ArrowLeft size={18} aria-hidden="true" /></button
        >
        <button aria-label="Next service" disabled={!canGoForward} onclick={() => api?.scrollNext()}
          ><ArrowRight size={18} aria-hidden="true" /></button
        >
      </div>
    </div>
  </div>
  <Wave />
</section>

<style>
  .services {
    position: relative;
    padding-top: 6rem;
    padding-bottom: 7rem;
    background: radial-gradient(ellipse at 40% 0, var(--forest-light), var(--forest) 70%);
    overflow: hidden;
  }

  .top-wave {
    position: absolute;
    inset: -1px 0 auto;
    width: 100%;
    height: 45px;
    fill: var(--ivory);
  }

  .section-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  .section-heading .lead {
    max-width: 330px;
    padding-bottom: 0.4rem;
  }

  .services-track {
    display: flex;
    align-items: start;
    gap: 1rem;
  }

  .service-slide {
    flex: 0 0 calc(25% - 0.75rem);
    min-width: 0;
  }

  .service-controls {
    display: none;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
    font-size: var(--text-small);
  }

  .service-controls i {
    color: var(--on-dark);
    font-style: normal;
  }

  .service-controls > div {
    display: flex;
    gap: 0.5rem;
  }

  button {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    color: var(--ivory);
    background: transparent;
    border: 1px solid var(--line-dark);
    border-radius: 50%;
  }

  button:disabled {
    opacity: 0.3;
  }

  @media (max-width: 900px) {
    .section-heading {
      display: block;
    }

    .section-heading .lead {
      margin-top: 1rem;
    }

    .services-viewport {
      position: relative;
      overflow-x: auto;
      scrollbar-width: none;
    }

    .services-viewport:global([data-enhanced]) {
      overflow: hidden;
      touch-action: pan-y pinch-zoom;
    }

    .services-viewport:global([data-enhanced]) .services-track {
      will-change: transform;
    }

    .service-slide {
      flex-basis: 46%;
    }

    .service-controls {
      display: flex;
    }
  }

  @media (max-width: 540px) {
    .service-slide {
      flex-basis: 88%;
    }
  }
</style>
