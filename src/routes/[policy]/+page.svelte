<script lang="ts">
  import { ArrowLeft, ArrowUpRight } from '@lucide/svelte';
  import SEO from '#lib/components/SEO.svelte';
  import { policies, type Policy } from '#lib/content/policies.ts';
  import { profile } from '#lib/content/profile.ts';

  let { data }: { data: { policy: Policy; updated: string } } = $props();
  const policy = $derived(data.policy);
  const updatedLabel = $derived(
    new Intl.DateTimeFormat('en-TT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(`${data.updated}T00:00:00Z`))
  );
</script>

<SEO
  title={`${policy.title} | Rennie Maharaj · TheWriterCo`}
  description={policy.summary}
  path={`/${policy.slug}/`}
/>
<main id="main" class="policy-page container" tabindex="-1">
  <a class="back-link" href="/"><ArrowLeft size={17} aria-hidden="true" /> Back to the portfolio</a>
  <header class="policy-heading">
    <p class="eyebrow">TheWriterCo · Policies</p>
    <h1>{policy.title}</h1>
    <p class="lead">{policy.summary}</p>
    <p class="updated">Last updated <time datetime={data.updated}>{updatedLabel}</time></p>
  </header>
  <div class="policy-grid">
    <nav class="policy-navigation" aria-label="Policies">
      <p>Our policies</p>
      {#each policies as item}
        <a href={`/${item.slug}/`} aria-current={item.slug === policy.slug ? 'page' : undefined}
          >{item.title}<ArrowUpRight size={15} aria-hidden="true" /></a
        >
      {/each}
    </nav>
    <article aria-label={policy.title}>
      {#each policy.sections as section}
        <section>
          <h2>{section.title}</h2>
          {#each section.paragraphs as paragraph}<p>{paragraph}</p>{/each}
        </section>
      {/each}
      <div class="policy-contact">
        <h2>Questions?</h2>
        <p>Contact Rennie Maharaj about this policy.</p>
        <a class="text-link" href={`mailto:${profile.email}`}
          >{profile.email}<ArrowUpRight size={16} aria-hidden="true" /></a
        >
      </div>
    </article>
  </div>
</main>

<style>
  .policy-page {
    padding-block: 9rem 5rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    min-height: 32px;
    color: var(--muted);
    font-size: var(--text-small);
  }

  .policy-heading {
    max-width: 850px;
    padding-block: 2.5rem 3rem;
  }

  h1 {
    font-size: clamp(2.6rem, 5vw, 4.7rem);
    font-weight: 500;
    overflow-wrap: anywhere;
  }

  .lead {
    max-width: 650px;
    margin-top: 1.3rem;
  }

  .updated {
    margin-top: 1.1rem;
    color: var(--muted);
    font-size: 0.75rem;
  }

  .policy-grid {
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr);
    gap: clamp(2rem, 5vw, 5rem);
    align-items: start;
  }

  .policy-navigation {
    position: sticky;
    top: 9rem;
    display: grid;
  }

  .policy-navigation > p {
    padding-bottom: 1rem;
    color: var(--muted);
    font-size: 0.75rem;
  }

  .policy-navigation a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;
    min-height: 48px;
    padding: 0.8rem 0.65rem;
    border-radius: 0.5rem;
    color: var(--muted);
    font-size: var(--text-small);
  }

  .policy-navigation a[aria-current='page'] {
    color: var(--forest);
    background: #e0e8d7;
    font-weight: 600;
  }

  article {
    padding: clamp(1.4rem, 4vw, 3rem);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: var(--paper);
  }

  section + section {
    margin-top: 2.1rem;
  }

  h2 {
    margin-bottom: 0.8rem;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: -0.035em;
  }

  section p,
  .policy-contact p {
    color: var(--muted);
  }

  section p + p {
    margin-top: 0.8rem;
  }

  .policy-contact {
    margin-top: 2rem;
    padding-top: 1.6rem;
    border-top: 1px solid var(--line);
  }

  .policy-contact .text-link {
    margin-top: 0.6rem;
    overflow-wrap: anywhere;
  }

  @media (max-width: 800px) {
    .policy-page {
      padding-top: 7rem;
    }

    .policy-grid {
      grid-template-columns: 1fr;
    }

    .policy-navigation {
      position: static;
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .policy-navigation > p {
      width: 100%;
      padding-bottom: 0.3rem;
    }

    .policy-navigation a {
      min-height: 44px;
      padding: 0.7rem;
      font-size: 0.75rem;
    }
  }
</style>
