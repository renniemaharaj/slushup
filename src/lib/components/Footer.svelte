<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';
  import SocialIcon from './SocialIcon.svelte';
  import Brand from './Brand.svelte';
  import { cookiePreferencesOpen } from '#lib/consent/preferences.ts';
  import { business, navigation } from '#lib/content/business.ts';
  const year = new Date().getFullYear();
</script>

<footer id="footer" class="dark">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <Brand />
        <p>Premium frozen treats and beverage experiences, crafted for unforgettable events.</p>
      </div>
      <nav aria-label="Footer navigation">
        {#each navigation as item}<a href={item.href}>{item.label}</a>{/each}
      </nav>
      <div class="footer-contact">
        <span>Let's celebrate</span>
        <a href={business.whatsapp}
          >+1 (868) 784-7976 <ArrowUpRight size={15} aria-hidden="true" /></a
        >
        <div class="social-links">
          <a
            href={business.instagram}
            aria-label="SlushUp on Instagram"
            target="_blank"
            rel="noopener noreferrer"><SocialIcon name="instagram" /></a
          >
          <a
            href={business.facebook}
            aria-label="SlushUp on Facebook"
            target="_blank"
            rel="noopener noreferrer"><SocialIcon name="facebook" /></a
          >
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {year} SlushUp Frozen Treats &amp; Beverages. All rights reserved.</p>
      <div class="policy-links">
        <a href="/privacy-policy/">Privacy Policy</a>
        <a href="/terms-and-conditions/">Terms &amp; Conditions</a>
        <a href="/cookie-policy/">Cookie Policy</a>
        <button class="cookie-settings" onclick={() => cookiePreferencesOpen.set(true)}
          >Cookie preferences</button
        >
      </div>
      <a href="/#hero">Back to the good times <span aria-hidden="true">↑</span></a>
    </div>
  </div>
</footer>

<style>
  footer {
    padding-top: 4rem;
    background: var(--forest-deep);
  }

  .footer-top {
    display: grid;
    grid-template-columns: 1.25fr 1fr 0.8fr;
    gap: 4rem;
    padding-bottom: 3rem;
  }

  .footer-brand > p {
    max-width: 270px;
    margin-top: 1rem;
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: start;
    gap: 0.35rem 2rem;
    padding-top: 0.3rem;
  }

  nav a {
    width: max-content;
    padding-block: 0.45rem;
    font-size: var(--text-small);
    transition: color var(--fast);
  }

  nav a:hover {
    color: var(--lime);
  }

  .footer-contact {
    padding-top: 0.3rem;
  }

  .footer-contact > span {
    display: block;
    margin-bottom: 1rem;
    color: var(--on-dark);
    font-size: var(--text-small);
    letter-spacing: 0;
  }

  .footer-contact > a {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: var(--text-small);
  }

  .social-links {
    display: flex;
    gap: 0.6rem;
    margin-top: 1rem;
  }

  .social-links a {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    background: var(--glass);
    border: 1px solid var(--line-dark);
    border-radius: 50%;
    transition:
      color var(--fast),
      background var(--fast);
  }

  .social-links a:hover {
    color: var(--forest);
    background: var(--lime);
  }

  .cookie-settings {
    padding: 0;
    color: inherit;
    border: 0;
    background: transparent;
    font-size: inherit;
    text-align: left;
  }

  .cookie-settings:hover {
    color: var(--lime);
  }

  .policy-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
  }

  .footer-bottom {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 1.5rem;
    color: var(--on-dark);
    border-top: 1px solid var(--line-dark);
    font-size: var(--text-small);
  }

  .footer-bottom a {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .footer-bottom span {
    color: var(--lime);
    font-size: 1.1rem;
  }

  @media (max-width: 900px) {
    .footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .footer-brand {
      grid-column: span 2;
    }

    .footer-brand > p {
      max-width: 380px;
    }
  }

  @media (max-width: 540px) {
    .footer-top {
      gap: 2rem 1rem;
    }

    nav {
      gap: 0.3rem 1rem;
    }

    .footer-contact > a {
      font-size: var(--text-small);
      gap: 0.3rem;
    }

    .policy-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1.25rem;
    }

    .footer-bottom {
      flex-wrap: wrap;
      align-items: start;
      flex-direction: column;
      font-size: var(--text-small);
    }
  }
</style>
