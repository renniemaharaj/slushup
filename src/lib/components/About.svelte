<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';
  import { profile } from '#lib/content/profile.ts';
</script>

<section id="about" class="section about" aria-labelledby="about-title">
  <div class="container about-grid">
    <div class="about-intro" data-reveal>
      <p class="eyebrow">A little about me</p>
      <h2 id="about-title">An engineer.<br /><span class="serif">Always a student.</span></h2>
      <div class="about-portrait">
        <img
          src="/projects/rennie-maharaj-small.webp"
          width="230"
          height="230"
          alt="Rennie Maharaj"
          loading="lazy"
        />
        <p>Based in Trinidad &amp; Tobago.<br />Working across software and systems.</p>
      </div>
    </div>
    <div class="about-story" data-reveal>
      <p class="about-lead">
        I’m interested in how things fit together. In software, that means building systems that are
        efficient, maintainable, and understandable.
      </p>
      <p>
        I work across backend engineering, web applications, infrastructure, and enterprise
        integrations. I enjoy the small tools that make a day easier as much as the architecture
        that holds a larger application together.
      </p>
      <p>
        Beyond software, my interests include electronics, networking, artificial intelligence,
        history, and the origins and relationships behind people, places, systems, and ideas.
      </p>
      <a class="text-link" href={profile.linkedin}
        >Connect on LinkedIn <ArrowUpRight size={18} aria-hidden="true" /></a
      >
      <div id="experience" class="experience">
        <p class="experience-label">Professional experience</p>
        <div class="experience-heading">
          <h3>Software Engineer &amp;<br />Integrations Consultant</h3>
          <span>2024–Present</span>
        </div>
        <p class="employer">HRTM Consulting Inc.</p>
        <ul>
          <li>TeleStaff configuration, personnel imports, validation, and automation tools.</li>
          <li>Operational analytics, reporting, and data visualization.</li>
          <li>Frappe/ERPNext, payroll integrations, and workflow automation.</li>
          <li>Backend services, internal tools, infrastructure, and system integrations.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  .about-grid {
    display: grid;
    grid-template-columns: 0.9fr 1.2fr;
    gap: clamp(3rem, 8vw, 8rem);
  }

  .about-portrait {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .about-portrait img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
  }

  .about-portrait p {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .about-story > p {
    color: var(--muted);
    margin-bottom: 1.2rem;
  }

  .about-story .about-lead {
    font-size: clamp(1.3rem, 2vw, 1.65rem);
    color: var(--ink);
    line-height: 1.6;
    letter-spacing: -0.025em;
  }

  .experience {
    border-top: 1px solid var(--line);
    margin-top: 2.5rem;
    padding-top: 2rem;
    scroll-margin-top: 8rem;
  }

  .experience-label {
    margin-bottom: 1.3rem;
    color: var(--green-dark);
    font-size: 0.8rem;
  }

  .experience-heading {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .experience-heading h3 {
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .experience-heading span {
    flex-shrink: 0;
    color: var(--muted);
    font-size: 0.8rem;
  }

  .employer {
    margin-top: 0.6rem;
    color: var(--muted);
    font-size: var(--text-small);
  }

  .experience ul {
    padding-left: 1.1rem;
    margin-block: 1.4rem 0;
    color: var(--muted);
    font-size: var(--text-small);
    line-height: 1.8;
  }

  .experience li + li {
    margin-top: 0.5rem;
  }

  .experience li::marker {
    color: var(--green-dark);
  }

  @media (max-width: 800px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  @media (max-width: 390px) {
    .experience-heading {
      flex-direction: column;
    }
  }
</style>
