<script lang="ts">
  import type { EmblaCarouselType } from 'embla-carousel';
  import { ArrowLeft, ArrowRight, ArrowUpRight } from '@lucide/svelte';
  import Media from './Media.svelte';
  import { carousel } from '#lib/motion/carousel.ts';
  import { occasions } from '#lib/content/occasions.ts';
  import { business } from '#lib/content/business.ts';

  let api = $state<EmblaCarouselType>();
  let selected = $state(2);

  function ready(instance: EmblaCarouselType) {
    api = instance;
    selected = instance.selectedScrollSnap();
    instance.on('select', () => (selected = instance.selectedScrollSnap()));
  }

  function keydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      if (event.key === 'ArrowRight') {
        api?.scrollNext();
      } else {
        api?.scrollPrev();
      }
    }
  }
</script>

<section id="occasions" class="occasions section" aria-labelledby="occasions-title">
  <div class="container heading">
    <p class="eyebrow">Occasions</p>
    <h2 id="occasions-title">Here's to your kind of celebration.</h2>
    <p class="lead">Intimate gatherings. Grand celebrations. A SlushUp moment for every one.</p>
  </div>
  <div class="carousel-shell">
    <div
      class="occasions-viewport"
      use:carousel={{
        options: { loop: true, align: 'center', startIndex: 2, duration: 30 },
        onready: ready
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Event occasions, use left and right arrow keys to browse"
    >
      <div class="occasions-track">
        {#each occasions as occasion, index}
          <article
            class:active={selected === index}
            class="occasion-slide"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${occasions.length}: ${occasion.title}`}
          >
            <div class="occasion-frame">
              <div class="occasion-image">
                <Media
                  name={occasion.image}
                  position={occasion.position}
                  alt={`${occasion.title} with SlushUp drinks and mobile bar service`}
                  sizes="(min-width: 900px) 45vw, 85vw"
                />
              </div>
              <div class="occasion-gradient"></div>
              <div class="occasion-content">
                <occasion.icon size={24} strokeWidth={1.3} aria-hidden="true" />
                <h3>{occasion.title}</h3>
                <p>{occasion.description}</p>
              </div>
              <a
                href={business.booking}
                class="occasion-link"
                aria-label={`Enquire about ${occasion.title.toLowerCase()}`}
                tabindex={selected === index ? 0 : -1}
                ><ArrowUpRight size={19} aria-hidden="true" /></a
              >
            </div>
          </article>
        {/each}
      </div>
    </div>
    <div class="container carousel-controls">
      <button
        onkeydown={keydown}
        class="carousel-arrow"
        aria-label="Previous occasion"
        onclick={() => api?.scrollPrev()}
        disabled={!api}><ArrowLeft size={20} aria-hidden="true" /></button
      >
      <div class="carousel-dots" aria-label="Choose an occasion">
        {#each occasions as occasion, index}
          <button
            onkeydown={keydown}
            class:current={selected === index}
            aria-label={`Show ${occasion.title}`}
            aria-pressed={selected === index}
            onclick={() => api?.scrollTo(index)}><span></span></button
          >
        {/each}
      </div>
      <button
        onkeydown={keydown}
        class="carousel-arrow"
        aria-label="Next occasion"
        onclick={() => api?.scrollNext()}
        disabled={!api}><ArrowRight size={20} aria-hidden="true" /></button
      >
    </div>
    <p aria-live="polite" class="sr-only">
      {occasions[selected].title}, {selected + 1} of {occasions.length}
    </p>
  </div>
</section>

<style>
  .occasions {
    padding-top: 2.5rem;
    overflow: hidden;
  }

  .heading {
    margin-bottom: 2.8rem;
    text-align: center;
  }

  .eyebrow {
    justify-content: center;
  }

  .lead {
    margin-top: 1rem;
  }

  .occasions-viewport {
    overflow-x: auto;
    scrollbar-width: none;
    touch-action: pan-y pinch-zoom;
  }

  .occasions-viewport:global([data-enhanced]) {
    overflow: hidden;
  }

  .occasions-track {
    display: flex;
    gap: 1.25rem;
  }

  .occasion-slide {
    position: relative;
    flex: 0 0 35%;
    min-width: 0;
    aspect-ratio: 1.15;
    color: var(--white);
  }

  .occasion-frame {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: var(--radius);
    transform: scale(0.91);
    transition: transform 600ms var(--ease);
  }

  .occasion-slide.active .occasion-frame {
    transform: scale(1);
  }

  .occasion-image,
  .occasion-gradient {
    position: absolute;
    inset: 0;
  }

  .occasion-gradient {
    background: var(--occasion-gradient);
  }

  .occasion-content {
    position: absolute;
    inset: auto 2rem 2rem;
    max-width: calc(100% - 6.5rem);
  }

  h3 {
    margin-top: 0.8rem;
    font-size: 1.5rem;
  }

  .occasion-content p {
    max-width: 300px;
    margin-top: 0.6rem;
    font-size: var(--text-body);
    line-height: 1.6;
  }

  .occasion-link {
    position: absolute;
    right: 1.4rem;
    bottom: 1.5rem;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    color: var(--forest);
    background: var(--ivory);
    border-radius: 50%;
  }

  .carousel-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.6rem;
  }

  .carousel-arrow {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    color: var(--forest);
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 50%;
    transition: background var(--fast);
  }

  .carousel-arrow:hover {
    background: var(--lime);
  }

  .carousel-dots {
    display: flex;
  }

  .carousel-dots button {
    display: grid;
    place-items: center;
    width: 28px;
    height: 44px;
    padding: 0;
    background: transparent;
    border: none;
  }

  .carousel-dots span {
    width: 6px;
    height: 6px;
    background: var(--muted);
    border-radius: 999px;
    transition:
      width var(--normal),
      background var(--normal);
  }

  .current span {
    width: 20px;
    background: var(--green);
  }

  @media (min-width: 1600px) {
    .occasion-slide {
      flex-basis: 30%;
    }
  }

  @media (max-width: 900px) {
    .occasion-slide {
      flex-basis: 65%;
      aspect-ratio: 1.1;
    }
  }

  @media (max-width: 540px) {
    .occasion-slide {
      flex-basis: 86%;
      aspect-ratio: 0.88;
    }

    .occasions-track {
      gap: 0.5rem;
    }

    .occasion-content {
      inset-inline: 1.5rem;
      max-width: calc(100% - 6rem);
    }

    .occasion-content p {
      font-size: var(--text-body);
    }
  }
</style>
