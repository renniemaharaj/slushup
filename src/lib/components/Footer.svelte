<script lang="ts">
  import Linkedin from '#lib/components/LinkedinIcon.svelte';
  import Github from '#lib/components/GithubIcon.svelte';
  import { ArrowUpRight, Mail, Phone } from '@lucide/svelte';
  import { profile, navigation } from '#lib/content/profile.ts';
  import Brand from './Brand.svelte';
  import { policies } from '#lib/content/policies.ts';
</script>

<footer id="contact" class="dark">
  <div class="container">
    <div class="contact-grid">
      <div>
        <p class="eyebrow">Let’s make something work.</p>
        <h2>Have a project<br /><span class="serif">in mind?</span></h2>
      </div>
      <div class="contact-copy">
        <p>
          Whether you need a custom application, a system integration, infrastructure assistance, or
          support implementing open-source software, get in touch to discuss your requirements.
        </p>
        <a href={`mailto:${profile.email}`} class="email-link"
          >{profile.email}<ArrowUpRight size={26} aria-hidden="true" /></a
        ><a class="telephone" href={`tel:${profile.telephone}`}
          ><Phone size={17} aria-hidden="true" />{profile.telephoneDisplay}</a
        >
      </div>
    </div>
    <div class="footer-middle">
      <Brand />
      <nav aria-label="Footer navigation">
        {#each navigation as item}<a href={item.href}>{item.label}</a>{/each}
      </nav>
      <div class="social-links">
        <a href={profile.github} aria-label="Rennie Maharaj on GitHub"
          ><Github size={20} aria-hidden="true" /></a
        ><a href={profile.linkedin} aria-label="Rennie Maharaj on LinkedIn"
          ><Linkedin size={20} aria-hidden="true" /></a
        ><a href={`mailto:${profile.email}`} aria-label="Email Rennie Maharaj"
          ><Mail size={20} aria-hidden="true" /></a
        >
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {new Date().getFullYear()} Rennie Maharaj · TheWriterCo</p>
      <p>Made with care in Trinidad &amp; Tobago.</p>
    </div>
    <nav class="policy-links" aria-label="Legal and policies">
      {#each policies as policy}
        <a href={`/${policy.slug}/`}>{policy.title}</a>
      {/each}
      <a href="/credits/">Sources &amp; credits</a>
    </nav>
  </div>
</footer>

<style>
  footer {
    padding-block: clamp(4rem, 7vw, 7rem) 1.5rem;
    border-radius: 2.5rem 2.5rem 0 0;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 7vw, 7rem);
    align-items: end;
    padding-bottom: 4rem;
  }

  h2 {
    font-size: clamp(3rem, 5.7vw, 5.5rem);
    font-weight: 500;
  }

  .contact-copy > p {
    max-width: 510px;
    color: var(--on-dark);
  }

  .email-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 1.3rem;
    margin-top: 1rem;
    border-bottom: 1px solid var(--line-dark);
    font-size: clamp(1.1rem, 2.2vw, 1.8rem);
    letter-spacing: -0.04em;
    overflow-wrap: anywhere;
  }

  .email-link :global(svg) {
    flex-shrink: 0;
    color: var(--lime);
  }

  .telephone {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    margin-top: 1rem;
    font-size: var(--text-small);
    color: var(--on-dark);
  }

  .footer-middle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding-block: 2rem;
    border-top: 1px solid var(--line-dark);
    border-bottom: 1px solid var(--line-dark);
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    color: var(--on-dark);
    font-size: var(--text-small);
  }

  .social-links {
    display: flex;
    gap: 0.6rem;
  }

  .social-links a {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
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

  .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.6rem 1rem;
    padding-top: 1.4rem;
    color: var(--on-dark);
    font-size: 0.7rem;
  }

  .policy-links {
    gap: 0.5rem 1.4rem;
    padding-top: 1rem;
    color: var(--on-dark);
    font-size: 0.75rem;
  }

  .policy-links a {
    display: inline-flex;
    align-items: center;
    min-height: 36px;
    text-underline-offset: 4px;
  }

  .policy-links a:hover {
    text-decoration: underline;
  }

  @media (max-width: 800px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding-bottom: 3rem;
    }

    .footer-middle {
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    nav {
      width: 100%;
      order: 3;
    }
  }
</style>
