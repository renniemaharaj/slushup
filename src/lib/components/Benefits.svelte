<script lang="ts">
  import { Leaf, UsersRound, SlidersHorizontal, Martini, Sparkles } from '@lucide/svelte';

  const benefits = [
    {
      icon: Leaf,
      title: 'Quality ingredients',
      description: 'Premium spirits, fresh garnishes, and flavours worth celebrating.'
    },
    {
      icon: UsersRound,
      title: 'People who care',
      description: 'Experienced bartenders and friendly service from start to finish.'
    },
    {
      icon: SlidersHorizontal,
      title: 'Uniquely your event',
      description: 'Custom recipes and drink menus tailored to your celebration.'
    },
    {
      icon: Martini,
      title: 'A drink for everyone',
      description: 'Cocktails, mocktails, and frozen treats. Every guest is included.'
    }
  ];
</script>

<section id="about" class="benefits section" aria-labelledby="benefits-title">
  <div class="container">
    <div class="benefits-heading">
      <div>
        <p class="eyebrow">About SlushUp</p>
        <h2 id="benefits-title">More than a bar.<br />Part of the memory.</h2>
      </div>
      <p class="lead">
        The details make the difference. We bring thoughtful drinks, professional service, and our
        signature touch to every celebration.
      </p>
    </div>
    <div class="benefits-grid">
      {#each benefits as benefit}
        <div class="benefit">
          <benefit.icon size={29} strokeWidth={1.25} aria-hidden="true" />
          <h3>{benefit.title}</h3>
          <p>{benefit.description}</p>
        </div>
      {/each}
    </div>
    <div class="brand-statement">
      <Sparkles size={23} strokeWidth={1.25} aria-hidden="true" />
      <p>A little more flavour. A little more celebration. <em>A lot more SlushUp.</em></p>
      <span>Live the Slush Up life</span>
    </div>
  </div>
</section>

<style>
  .benefits-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 3rem;
  }

  .benefits-heading .lead {
    max-width: 350px;
  }

  em {
    color: var(--green-dark);
    font-family: Georgia, serif;
    font-weight: 400;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }

  .benefit {
    padding-right: 1.5rem;
    border-right: 1px solid var(--line);
  }

  .benefit:last-child {
    border: none;
  }

  .benefit :global(svg) {
    color: var(--green-dark);
    margin-bottom: 1.3rem;
  }

  h3 {
    font-size: 1.125rem;
    letter-spacing: -0.02em;
  }

  .benefit p {
    max-width: 230px;
    margin-top: 0.6rem;
    color: var(--muted);
    font-size: var(--text-body);
  }

  .brand-statement {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.6rem 2rem;
    margin-top: 3.5rem;
    border: 1px solid var(--line);
    border-radius: 1rem;
  }

  .brand-statement :global(svg) {
    flex-shrink: 0;
    color: var(--green-dark);
  }

  .brand-statement p {
    font-size: var(--text-small);
  }

  .brand-statement span {
    margin-left: auto;
    font-size: var(--text-small);
    font-weight: 700;
    letter-spacing: 0;
    white-space: nowrap;
  }

  @media (max-width: 900px) {
    .benefits-heading {
      display: block;
    }

    .benefits-heading .lead {
      max-width: 550px;
      margin-top: 1.4rem;
    }

    .benefits-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem 1.5rem;
    }

    .benefit:nth-child(2) {
      border: none;
    }

    .brand-statement span {
      display: none;
    }
  }

  @media (max-width: 540px) {
    .benefit {
      padding-right: 1rem;
    }

    .benefit p {
      font-size: var(--text-body);
    }

    .brand-statement {
      padding: 1.2rem;
      gap: 1rem;
    }

    .brand-statement p {
      font-size: var(--text-small);
    }
  }
</style>
