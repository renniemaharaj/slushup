<script lang="ts">
  import { ArrowUpRight, Plus, Minus } from '@lucide/svelte';
  import { capabilities, services } from '#lib/content/services.ts';
  import { profile } from '#lib/content/profile.ts';
  import Button from './Button.svelte';
</script>

<section id="expertise" class="section dark expertise" aria-labelledby="expertise-title">
  <div class="container">
    <div class="section-heading" data-reveal>
      <div>
        <p class="eyebrow">The engineering behind the interface</p>
        <h2 id="expertise-title">
          See the whole system.<br /><span class="serif">Care about the details.</span>
        </h2>
      </div>
      <p class="lead">
        Good software connects the pieces. My work spans the application, the data, the integration,
        and the environment it runs in.
      </p>
    </div>
    <div class="capabilities">
      {#each capabilities as capability}
        <article class="capability" data-reveal>
          <h3>{capability.title}</h3>
          <div>
            <p>{capability.description}</p>
            <span class="technology-line">{capability.technologies}</span>
          </div>
          <a href={capability.href} aria-label={`Explore ${capability.example}`}
            >{capability.example}<ArrowUpRight size={19} aria-hidden="true" /></a
          >
        </article>
      {/each}
    </div>
  </div>
</section>

<section id="services" class="section services" aria-labelledby="services-title">
  <div class="container services-grid">
    <div class="services-intro" data-reveal>
      <p class="eyebrow">Work with me</p>
      <h2 id="services-title">
        Your next idea.<br /><span class="serif">A practical way forward.</span>
      </h2>
      <p class="lead">
        A new application, an integration that needs care, or an existing system that should work
        better. Let’s start with the problem.
      </p>
      <Button href={`mailto:${profile.email}?subject=Let%E2%80%99s%20discuss%20a%20project`}
        >Discuss a project</Button
      >
      <p class="billing">
        Generally billed hourly. Project-based arrangements are possible following a discussion.
      </p>
    </div>
    <div class="service-list">
      {#each services as service, index}
        <details name="services" open={index === 0} data-reveal>
          <summary
            ><h3>{service.title}</h3>
            <Plus class="open-icon" size={21} aria-hidden="true" /><Minus
              class="close-icon"
              size={21}
              aria-hidden="true"
            /></summary
          >
          <div class="service-body">
            <p>{service.description}</p>
            <p class="service-detail">{service.detail}</p>
            <a
              class="text-link"
              href={`mailto:${profile.email}?subject=${encodeURIComponent(service.title)}`}
              >Let’s talk about it <ArrowUpRight size={17} aria-hidden="true" /></a
            >
          </div>
        </details>
      {/each}
    </div>
  </div>
</section>

<style>
  .expertise {
    position: relative;
    border-radius: 2.5rem 2.5rem 0 0;
  }

  .section-heading .lead {
    max-width: 370px;
  }

  .capabilities {
    margin-top: 3.7rem;
  }

  .capability {
    display: grid;
    grid-template-columns: 1fr 1.5fr 0.85fr;
    gap: 2.5rem;
    align-items: start;
    padding-block: 1.8rem;
    border-top: 1px solid var(--line-dark);
  }

  .capability h3 {
    max-width: 240px;
    font-size: 1.15rem;
    font-weight: 500;
  }

  .capability p {
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  .technology-line {
    display: block;
    margin-top: 0.8rem;
    color: #a7bba9;
    font-size: 0.75rem;
    line-height: 1.7;
  }

  .capability > a {
    display: flex;
    justify-content: space-between;
    gap: 0.7rem;
    color: var(--lime);
    font-size: 0.75rem;
    line-height: 1.7;
  }

  .capability > a :global(svg) {
    flex-shrink: 0;
  }

  .services-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.2fr;
    gap: clamp(3rem, 8vw, 8rem);
  }

  .services-intro {
    align-self: start;
    position: sticky;
    top: 9rem;
  }

  .services-intro .lead {
    margin-block: 1.5rem 2rem;
  }

  .billing {
    max-width: 310px;
    margin-top: 1.5rem;
    color: var(--muted);
    font-size: 0.75rem;
  }

  details {
    border-top: 1px solid var(--line);
  }

  details:last-child {
    border-bottom: 1px solid var(--line);
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding-block: 1.65rem;
    cursor: pointer;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary h3 {
    font-size: 1.2rem;
    font-weight: 500;
  }

  summary :global(svg) {
    flex-shrink: 0;
  }

  summary :global(.close-icon),
  details[open] summary :global(.open-icon) {
    display: none;
  }

  details[open] summary :global(.close-icon) {
    display: block;
  }

  .service-body {
    padding-bottom: 1.8rem;
    color: var(--muted);
  }

  .service-detail {
    margin-block: 0.7rem 1.2rem;
    font-size: var(--text-small);
  }

  .service-body .text-link {
    color: var(--green-dark);
  }

  @media (max-width: 900px) {
    .capability {
      grid-template-columns: 1fr 1.5fr;
      gap: 1.3rem;
    }

    .capability > a {
      grid-column: 2;
      justify-content: start;
    }

    .services-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .services-intro {
      position: static;
    }
  }

  @media (max-width: 540px) {
    .capability {
      grid-template-columns: 1fr;
      gap: 0.8rem;
    }

    .capability > a {
      grid-column: auto;
    }
  }
</style>
