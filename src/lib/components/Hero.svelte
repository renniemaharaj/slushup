<script lang="ts">
  import { Martini, Gem, UsersRound, ArrowDown } from '@lucide/svelte';
  import Media from './Media.svelte';
  import Button from './Button.svelte';
  import Wave from './Wave.svelte';
  import { business } from '#lib/content/business.ts';
</script>

<section id="hero" class="hero dark" aria-labelledby="hero-heading">
  <div class="hero-photo" data-parallax>
    <Media
      name="drinks-image-weddings-wide.jpeg"
      alt="Colourful SlushUp cocktails with fresh fruit garnishes, prepared for a celebration"
      priority
      sizes="(min-width: 900px) 80vw, 100vw"
      position="60% center"
    />
  </div>
  <div class="hero-shade"></div>
  <div class="container hero-content">
    <p class="eyebrow hero-reveal">Premium alcoholic &amp; non-alcoholic treats</p>
    <h1 id="hero-heading">
      <span class="hero-line">Good company.</span>
      <span class="hero-line">Great drinks.</span>
      <span class="hero-line accent">Unforgettable <em>moments.</em></span>
    </h1>
    <p class="hero-description hero-reveal">
      Luxury mobile bar &amp; bartending services. We bring the cocktails, the frozen treats, and a
      little SlushUp magic to your celebration.
    </p>
    <div class="actions hero-reveal">
      <Button href={business.booking} variant="secondary" size="large">Let's Plan Your Event</Button
      >
      <Button href="#services" variant="outline" size="large">Explore Services</Button>
    </div>
    <ul class="hero-benefits hero-reveal" aria-label="The SlushUp experience">
      <li><Martini size={18} aria-hidden="true" /> Premium drinks</li>
      <li><UsersRound size={18} aria-hidden="true" /> Professional staff</li>
      <li><Gem size={18} aria-hidden="true" /> Made for your event</li>
    </ul>
  </div>
  <a href="#experience" class="scroll-cue">
    <span><ArrowDown size={15} aria-hidden="true" /></span>
    Scroll to discover
    <i></i>
  </a>
  <div class="photo-note">
    <span>The SlushUp experience</span><small>Real drinks. Real celebrations.</small>
  </div>
  <Wave layered />
</section>

<style>
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    min-height: min(850px, 95svh);
    min-height: clamp(710px, 57vw, 850px);
    isolation: isolate;
    overflow: hidden;
  }

  .hero-photo {
    position: absolute;
    inset: 0 0 0 24%;
    z-index: -3;
  }

  .hero-shade {
    position: absolute;
    inset: 0;
    z-index: -2;
    background: var(--hero-gradient);
  }

  .hero-content {
    position: relative;
    padding-block: 155px 125px;
  }

  .eyebrow {
    margin-bottom: 1.5rem;
    font-size: var(--text-small);
  }

  h1 {
    max-width: 690px;
  }

  .hero-line {
    display: block;
  }

  .accent {
    max-width: 650px;
    color: var(--lime);
  }

  em {
    font-family: Georgia, serif;
    font-weight: 400;
    letter-spacing: -0.055em;
  }

  .hero-description {
    max-width: 430px;
    margin-top: 1.6rem;
    color: var(--on-dark);
    font-size: var(--text-body);
  }

  .actions {
    margin-top: 1.8rem;
  }

  .hero-benefits {
    display: flex;
    flex-wrap: wrap;
    gap: 1.8rem;
    padding: 0;
    margin: 2.6rem 0 0;
    list-style: none;
  }

  .hero-benefits li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: var(--text-small);
  }

  .hero-benefits :global(svg) {
    color: var(--lime);
    stroke-width: 1.3;
  }

  .scroll-cue {
    position: absolute;
    bottom: 65px;
    left: var(--gutter);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: var(--text-small);
    color: var(--on-dark);
  }

  .scroll-cue span {
    display: grid;
    place-items: center;
    width: 25px;
    height: 38px;
    border: 1px solid var(--line-dark);
    border-radius: 999px;
  }

  .scroll-cue i {
    width: 40px;
    height: 1px;
    background: var(--line-dark);
  }

  .photo-note {
    position: absolute;
    right: var(--gutter);
    bottom: 115px;
    text-align: right;
  }

  .photo-note span {
    font-size: var(--text-small);
    letter-spacing: 0;
  }

  .photo-note small {
    display: block;
    margin-top: 0.5rem;
    color: var(--on-dark);
    font-family: Georgia, serif;
    font-style: italic;
    font-size: 1rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    .hero-photo :global(img) {
      animation: settle 1.1s var(--ease);
    }

    .hero-line {
      animation: rise 0.65s var(--ease);
    }

    .hero-line:nth-child(2) {
      animation-duration: 0.75s;
    }

    .hero-line:nth-child(3) {
      animation-duration: 0.85s;
    }
  }

  @keyframes settle {
    from {
      transform: scale(1.025);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes rise {
    from {
      transform: translateY(12px);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (min-width: 1600px) {
    .hero-photo {
      inset-inline-start: 30%;
    }
  }

  @media (max-width: 900px) {
    .hero {
      min-height: 800px;
      align-items: end;
    }

    .hero-photo {
      inset: 0 0 25%;
    }

    .hero-shade {
      background: var(--hero-gradient-mobile);
    }

    .hero-content {
      padding-block: 250px 130px;
    }

    h1 {
      max-width: 600px;
    }

    .photo-note {
      display: none;
    }

    .scroll-cue {
      bottom: 55px;
    }
  }

  @media (max-width: 540px) {
    .hero {
      min-height: 850px;
    }

    .hero-content {
      padding-top: 270px;
      padding-bottom: 120px;
    }

    .hero-photo {
      inset: 60px -25% 40%;
    }

    .eyebrow {
      max-width: 280px;
      font-size: var(--text-small);
    }

    .hero-description {
      font-size: var(--text-body);
    }

    .hero-benefits {
      gap: 1rem;
      margin-top: 1.8rem;
    }

    .hero-benefits li {
      font-size: var(--text-small);
      gap: 0.4rem;
    }

    .hero-benefits :global(svg) {
      width: 15px;
    }

    .actions {
      gap: 0.7rem;
    }

    .actions :global(.button) {
      padding-inline: 1.1rem;
      font-size: var(--text-small);
      gap: 0.8rem;
    }
  }
</style>
