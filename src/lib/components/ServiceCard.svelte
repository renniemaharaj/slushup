<script lang="ts">
  import { ArrowUpRight, Check } from '@lucide/svelte';
  import type { Service } from '#lib/content/services.ts';

  let { service }: { service: Service } = $props();
  let active = $state(false);

  function revealOnHover(event: PointerEvent) {
    if (event.pointerType === 'mouse') {
      active = true;
    }
  }

  function revealOnFocus(event: FocusEvent) {
    if ((event.currentTarget as HTMLElement).matches(':focus-visible')) {
      active = true;
    }
  }
</script>

<article class="service-card" class:active>
  <div class="card-face" aria-hidden={active}>
    <span class="service-icon"
      ><service.icon size={29} strokeWidth={1.25} aria-hidden="true" /></span
    >
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <span class="card-bottom">
      <span>Explore service</span>
      <span class="card-arrow"><ArrowUpRight size={17} aria-hidden="true" /></span>
    </span>
  </div>
  <div id={`details-${service.id}`} class="service-details" aria-hidden={!active} inert={!active}>
    <span class="service-icon"
      ><service.icon size={29} strokeWidth={1.25} aria-hidden="true" /></span
    >
    <p class="detail-eyebrow">Made for your event</p>
    <h3>{service.title}</h3>
    <ul>
      {#each service.details as detail}
        <li><Check size={15} aria-hidden="true" />{detail}</li>
      {/each}
    </ul>
    <span class="card-bottom">
      <span>Back to overview</span>
      <span class="card-arrow"><ArrowUpRight size={17} aria-hidden="true" /></span>
    </span>
  </div>
  <button
    type="button"
    class="card-toggle"
    aria-label={`${service.title}: service details`}
    aria-expanded={active}
    aria-controls={`details-${service.id}`}
    onpointerenter={revealOnHover}
    onpointerleave={(event) => {
      if (event.pointerType === 'mouse') {
        active = false;
      }
    }}
    onfocus={revealOnFocus}
    onblur={() => (active = false)}
    onclick={() => (active = !active)}
    onkeydown={(event) => {
      if (event.key === 'Escape') {
        active = false;
      }
    }}
  ></button>
</article>

<style>
  .service-card {
    position: relative;
    height: 460px;
    overflow: hidden;
    contain: paint;
    border: 1px solid var(--line-dark);
    border-radius: var(--radius);
    background: linear-gradient(145deg, var(--forest-light), var(--glass));
    transition: border-color 450ms var(--ease);
  }

  .service-card.active,
  .service-card:focus-within {
    border-color: var(--lime);
  }

  .card-face,
  .service-details {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: clamp(1rem, 1.8vw, 1.7rem);
  }

  .service-icon {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 49px;
    height: 49px;
    margin-bottom: 1.4rem;
    color: var(--lime);
    border: 1px solid var(--line-dark);
    border-radius: 50%;
    background: var(--glass);
  }

  h3 {
    font-size: 1.2rem;
  }

  .card-face > p {
    margin-top: 0.8rem;
    color: var(--on-dark);
    font-size: var(--text-body);
    line-height: 1.6;
  }

  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding-top: 1rem;
    margin-top: auto;
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  .card-arrow {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 32px;
    height: 32px;
    color: var(--forest);
    background: var(--lime);
    border-radius: 50%;
  }

  .service-details {
    position: absolute;
    inset: 0;
    z-index: 1;
    /* Opaque panels avoid filtering every card while the carousel moves. */
    background: linear-gradient(155deg, #245c42, #082e22 75%);
    transform: translateY(100%);
    transition: transform 450ms var(--ease);
    pointer-events: none;
  }

  .active .service-details {
    transform: translateY(0);
  }

  .detail-eyebrow {
    margin-bottom: 0.5rem;
    color: var(--lime);
    font-size: var(--text-small);
    font-weight: 600;
  }

  .service-details .card-arrow {
    transform: rotate(180deg);
  }

  ul {
    display: grid;
    gap: 0.8rem;
    padding: 0;
    margin: 1.4rem 0 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: start;
    gap: 0.6rem;
    font-size: var(--text-small);
    line-height: 1.5;
  }

  li :global(svg) {
    flex-shrink: 0;
    margin-top: 0.2rem;
    color: var(--lime);
  }

  .card-toggle {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: inherit;
    background: transparent;
  }

  .card-toggle:focus-visible {
    outline: 2px solid var(--lime);
    outline-offset: -5px;
  }
</style>
