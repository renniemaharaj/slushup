<script lang="ts">
  import Github from '#lib/components/GithubIcon.svelte';
  import { ArrowDown, ArrowUpRight, MapPin } from '@lucide/svelte';
  import Button from './Button.svelte';
  import { profile } from '#lib/content/profile.ts';
</script>

<section id="hero" class="hero" aria-labelledby="hero-title">
  <div class="container">
    <div class="hero-kicker">
      <p>Independent thinking. Practical software.</p>
      <a href={profile.github}
        >Go · TypeScript · Systems <ArrowUpRight size={16} aria-hidden="true" /></a
      >
    </div>
    <div class="hero-grid">
      <div class="hero-copy" data-reveal>
        <p class="eyebrow">Software Engineer &amp; Integrations Consultant</p>
        <h1 id="hero-title">Rennie<br />Maharaj<span>.</span></h1>
        <p class="hero-positioning">Thoughtful software.<br />Built for the real world.</p>
        <p class="lead">
          I design and build web applications, backend systems, developer tools, and enterprise
          integrations. Maintainable by design. Straightforward to operate.
        </p>
        <div class="actions">
          <Button href="/#work">Explore my work</Button>
          <Button href="/#services" variant="text">Engineering services</Button>
        </div>
      </div>
      <div class="hero-portrait" data-reveal>
        <div class="portrait-frame" data-parallax>
          <img
            src="/projects/rennie-maharaj.webp"
            srcset="/projects/rennie-maharaj-small.webp 230w, /projects/rennie-maharaj.webp 460w"
            sizes="(max-width: 700px) 260px, 420px"
            width="460"
            height="460"
            alt="Rennie Maharaj"
            fetchpriority="high"
          />
        </div>
        <div class="portrait-note">
          <span class="note-mark" aria-hidden="true">↗</span>
          <p>
            Curious about how things work.<br /><strong>Careful about how they’re built.</strong>
          </p>
        </div>
        <div class="portrait-location">
          <MapPin size={15} aria-hidden="true" />
          {profile.location}
        </div>
      </div>
    </div>
    <div class="hero-bottom">
      <a href="/#work" class="scroll-cue"
        ><span class="circle"><ArrowDown size={18} aria-hidden="true" /></span> A closer look at the work</a
      >
      <div class="hero-links">
        <a href={`mailto:${profile.email}`}
          >Contact me <ArrowUpRight size={16} aria-hidden="true" /></a
        >
        <a href={profile.github}><Github size={17} aria-hidden="true" /> GitHub</a>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    overflow: clip;
    padding-top: 9.5rem;
    background: var(--ivory);
  }

  .hero-kicker,
  .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-size: var(--text-small);
  }

  .hero-kicker {
    padding-bottom: 1.1rem;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
  }

  .hero-kicker a,
  .hero-links a,
  .scroll-cue {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    align-items: center;
    gap: clamp(3rem, 8vw, 8rem);
    padding-block: 3.7rem 4.5rem;
  }

  .eyebrow {
    font-size: 0.85rem;
    margin-bottom: 1.6rem;
  }

  h1 {
    font-size: clamp(4.5rem, 8.7vw, 8.3rem);
    line-height: 0.95;
    letter-spacing: -0.075em;
    font-weight: 600;
  }

  h1 > span {
    color: var(--green);
  }

  .hero-positioning {
    margin-top: 2rem;
    font-size: clamp(1.45rem, 2.3vw, 2rem);
    line-height: 1.35;
    letter-spacing: -0.04em;
    font-weight: 500;
  }

  .lead {
    max-width: 500px;
    margin-block: 1rem 1.6rem;
  }

  .hero-portrait {
    position: relative;
    padding-top: 2.4rem;
  }

  .portrait-frame {
    overflow: hidden;
    border-radius: 45% 45% 1.5rem 1.5rem;
    background: #d1d5ca;
    aspect-ratio: 0.92;
  }

  .portrait-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .portrait-note {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: calc(100% + 1.5rem);
    margin: -1.8rem 0 0 -1.5rem;
    padding: 1.4rem 1.6rem;
    color: var(--ivory);
    background: var(--forest);
    border-radius: 0.8rem;
    box-shadow: var(--shadow);
  }

  .note-mark {
    color: var(--lime);
    font-size: 2rem;
  }

  .portrait-note p {
    font-size: 0.85rem;
    line-height: 1.7;
  }

  .portrait-note strong {
    font-weight: 500;
    color: var(--on-dark);
  }

  .portrait-location {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 1.1rem;
    font-size: var(--text-small);
    color: var(--muted);
  }

  .hero-bottom {
    padding-block: 1.4rem;
    border-top: 1px solid var(--line);
  }

  .circle {
    display: grid;
    width: 38px;
    height: 38px;
    border: 1px solid var(--line);
    border-radius: 50%;
    place-items: center;
  }

  .hero-links {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 900px) {
    .hero {
      padding-top: 7.5rem;
    }

    .hero-grid {
      gap: 2.5rem;
    }

    h1 {
      font-size: clamp(4rem, 9vw, 7rem);
    }

    .portrait-note {
      padding: 1rem;
    }
  }

  @media (max-width: 700px) {
    .hero-kicker > a {
      display: none;
    }

    .hero-grid {
      grid-template-columns: 1fr;
      padding-block: 2.5rem;
      gap: 0;
    }

    h1 {
      font-size: clamp(4.8rem, 16vw, 7rem);
    }

    .hero-portrait {
      width: min(310px, 90%);
      margin: 0 0 0 auto;
    }

    .portrait-frame {
      aspect-ratio: 1.15;
      border-radius: 6rem 6rem 1rem 1rem;
    }

    .hero-bottom {
      align-items: start;
    }

    .scroll-cue {
      max-width: 150px;
      line-height: 1.5;
    }

    .circle {
      flex-shrink: 0;
    }

    .hero-links {
      flex-direction: column;
      gap: 0.6rem;
      padding-top: 0.5rem;
    }
  }
</style>
