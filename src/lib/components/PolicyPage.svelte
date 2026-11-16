<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Media from './Media.svelte';
  import Wave from './Wave.svelte';
  import { business } from '#lib/content/business.ts';

  let {
    title,
    description,
    effectiveDate,
    lastUpdated,
    children
  }: {
    title: string;
    description: string;
    effectiveDate: string;
    lastUpdated: string;
    children: Snippet;
  } = $props();

  function formatDate(value: string) {
    return new Intl.DateTimeFormat('en-TT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));
  }
</script>

<svelte:head>
  <title>{title} | SlushUp</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={`${business.origin}${page.url.pathname}`} />
</svelte:head>

<Header solid />
<main id="main" class="policy-page" tabindex="-1">
  <div class="policy-photo" aria-hidden="true">
    <Media name="drinks-image-weddings-wide.jpeg" alt="" sizes="100vw" />
  </div>
  <div class="policy-introduction dark">
    <p class="eyebrow">Company policy</p>
    <h1>{title}</h1>
    <p class="lead">{description}</p>
  </div>
  <article class="policy-letter" aria-label={title}>
    <header class="letter-header">
      <a href="/" aria-label="SlushUp home">
        <img src="/slushup-logo.webp?v=3" width="80" height="80" alt="SlushUp Premium Drinks Bar" />
      </a>
      <div>
        <p class="document-title">{title}</p>
        <p>Effective date: <time datetime={effectiveDate}>{formatDate(effectiveDate)}</time></p>
        <p>Last updated: <time datetime={lastUpdated}>{formatDate(lastUpdated)}</time></p>
      </div>
    </header>
    <div class="letter-body">{@render children()}</div>
    <footer class="letter-footer">
      <p>If you have any questions about this policy, please get in touch.</p>
      <p>Thank you for choosing SlushUp.</p>
      <p class="signature">The SlushUp Team</p>
      <address>
        SlushUp Frozen Treats &amp; Beverages<br />
        Trinidad &amp; Tobago<br />
        <a href={`tel:${business.telephone}`}>+1 (868) 784-7976</a>
        <span aria-hidden="true"> · </span>
        <a href={business.whatsapp}>Contact us on WhatsApp</a>
      </address>
    </footer>
  </article>
  <Wave />
</main>
<Footer />

<style>
  .policy-page {
    position: relative;
    isolation: isolate;
    padding: 11rem var(--gutter) 8rem;
    background: var(--forest);
  }

  .policy-page:focus {
    outline: none;
  }

  .policy-photo {
    position: absolute;
    inset: 0 0 auto;
    z-index: -1;
    height: 530px;
    overflow: hidden;
  }

  .policy-photo::after {
    position: absolute;
    inset: 0;
    content: '';
    background: linear-gradient(0deg, var(--forest), #082e2299 75%, #082e2270);
  }

  .policy-introduction {
    max-width: 760px;
    margin: 0 auto 3rem;
    text-align: center;
    background: transparent;
  }

  .eyebrow {
    justify-content: center;
  }

  .lead {
    max-width: 680px;
    margin: 1.3rem auto 0;
    text-wrap: pretty;
  }

  .policy-letter {
    max-width: 900px;
    padding: clamp(1.5rem, 5vw, 3.5rem);
    margin-inline: auto;
    color: var(--ink);
    background: linear-gradient(140deg, var(--paper), var(--ivory));
    border: 1px solid #ffffff66;
    border-radius: var(--radius);
    box-shadow: 0 24px 80px #041e1733;
  }

  .letter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding-bottom: 1.75rem;
    margin-bottom: 2rem;
    color: var(--green-dark);
    border-bottom: 1px solid var(--line);
    text-align: right;
  }

  .letter-header > a {
    flex-shrink: 0;
  }
  .letter-header p {
    font-size: var(--text-small);
  }

  .letter-header .document-title {
    margin-bottom: 0.3rem;
    color: var(--forest);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .letter-body {
    max-width: 72ch;
    margin-inline: auto;
  }

  .letter-body :global(h2) {
    margin-block: 1.8rem 0.65rem;
    color: var(--forest);
    font-size: 1.25rem;
    line-height: 1.4;
    letter-spacing: -0.025em;
    text-wrap: pretty;
  }

  .letter-body :global(p),
  .letter-body :global(li) {
    font-size: var(--text-body);
    line-height: 1.8;
  }

  .letter-body :global(p + p) {
    margin-top: 0.85rem;
  }

  .letter-body :global(ul),
  .letter-body :global(ol) {
    padding-left: 1.3rem;
    margin-block: 0.75rem 1rem;
  }

  .letter-body :global(li + li) {
    margin-top: 0.4rem;
  }
  .letter-body :global(li::marker) {
    color: var(--green);
  }

  .letter-body :global(a),
  address a {
    color: var(--green-dark);
    text-decoration: underline;
    text-underline-offset: 3px;
    overflow-wrap: anywhere;
  }

  .letter-footer {
    padding-top: 1.75rem;
    margin-top: 2rem;
    border-top: 1px solid var(--line);
  }

  .letter-footer > p {
    font-family: Georgia, serif;
    font-style: italic;
  }

  .letter-footer .signature {
    width: fit-content;
    padding-bottom: 0.4rem;
    margin-block: 1rem;
    color: var(--forest);
    border-bottom: 2px solid var(--lime);
    font-size: 1.6rem;
  }

  address {
    color: var(--muted);
    font-size: var(--text-small);
    font-style: normal;
    line-height: 1.8;
  }

  @media (max-width: 540px) {
    .policy-page {
      padding: 8rem 1rem 5rem;
    }
    .policy-introduction {
      margin-bottom: 2rem;
    }
    h1 {
      font-size: clamp(2rem, 9vw, 2.65rem);
    }

    .letter-header {
      align-items: start;
      flex-direction: column;
      text-align: left;
    }

    .letter-header img {
      width: 64px;
      height: 64px;
    }
  }
</style>
