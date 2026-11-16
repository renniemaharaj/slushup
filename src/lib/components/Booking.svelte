<script lang="ts">
  import { MessageCircle, ArrowUpRight } from '@lucide/svelte';
  import Media from './Media.svelte';
  import Button from './Button.svelte';
  import { business } from '#lib/content/business.ts';
</script>

<section id="contact" class="booking dark" aria-labelledby="booking-title">
  <div class="booking-photo">
    <Media
      name="drinks-image-many.jpeg"
      alt="SlushUp frozen drinks in yellow, blue, red and green, lined up for an event"
      sizes="(min-width: 900px) 50vw, 100vw"
      position="center 60%"
    />
  </div>
  <div class="booking-shade"></div>
  <div class="container booking-content">
    <h2 id="booking-title">Let's make it<br />a SlushUp occasion.</h2>
    <p>
      Bring your people. We'll bring the flavour.<br />Tell us what you're celebrating and let's
      take it from there.
    </p>
    <div class="actions">
      <Button href={business.booking} variant="secondary" size="large"
        >Enquire About Your Event</Button
      >
      <Button href={business.whatsapp} variant="outline" leading={MessageCircle} arrow={false}
        >Let's Talk</Button
      >
    </div>
    <a class="booking-phone" href={`tel:${business.telephone}`}
      >Or give us a call: +1 (868) 784-7976 <ArrowUpRight size={14} aria-hidden="true" /></a
    >
  </div>
  <span class="booking-mark" aria-hidden="true">S.</span>
</section>

<style>
  .booking {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding-block: 5.5rem;
    background: var(--green-dark);
  }

  .booking-photo {
    position: absolute;
    z-index: -3;
    inset: 0 0 0 40%;
  }

  .booking-shade {
    position: absolute;
    z-index: -2;
    inset: 0;
    background: var(--booking-gradient);
  }

  h2 {
    max-width: 700px;
    font-size: clamp(2.4rem, 4.4vw, 4.1rem);
  }

  .booking-content > p:not(.eyebrow) {
    margin-block: 1.5rem 2rem;
    font-size: var(--text-body);
    color: var(--on-dark);
  }

  .booking-phone {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: 1.8rem;
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  .booking-mark {
    position: absolute;
    z-index: -1;
    right: 3%;
    bottom: -70px;
    color: var(--glass);
    font-size: 350px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.1em;
  }

  @media (max-width: 900px) {
    .booking {
      padding-block: 4rem;
    }

    .booking-photo {
      inset: 0;
    }

    .booking-shade {
      background: var(--booking-overlay);
    }
  }

  @media (max-width: 540px) {
    .booking-content > p:not(.eyebrow) {
      font-size: var(--text-body);
    }

    .actions :global(.button) {
      font-size: var(--text-small);
      padding-inline: 1.2rem;
    }
  }
</style>
