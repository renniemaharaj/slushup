<script lang="ts">
  import SEO from '#lib/components/SEO.svelte';
  import { projects } from '#lib/content/projects.ts';
  let { data }: { data: { fetchedAt: string | null } } = $props();
</script>

<SEO
  title="Sources & media credits | Rennie Maharaj"
  description="Repository sources, project ownership, licenses, and credits for the original screenshots used in Rennie Maharaj’s portfolio."
  path="/credits/"
/>
<main id="main" class="credits container" tabindex="-1">
  <p class="eyebrow">A note on the source</p>
  <h1>Sources &amp;<br /><span class="serif">media credits.</span></h1>
  <p class="intro">
    Project descriptions draw on public repository documentation and contribution history.
    Presentation copy is maintained separately. The local GitHub reference snapshot was retrieved on {data.fetchedAt}.
  </p>
  <section>
    <h2>Project documentation &amp; licenses</h2>
    <p>
      The five personal featured repositories have verified MIT licenses. JVMS is an upstream
      MIT-licensed project by ystyle and contributors; Rennie’s role is contributor. Frappe and
      ERPNext are upstream projects: the featured Frappe Docker work is Rennie’s independent
      deployment environment.
    </p>
    <ul>
      {#each projects as project}<li>
          <a href={`https://github.com/${project.repo}`}>{project.name}</a> — {project.ownership}; {project.license}.
          <a
            href={`https://github.com/${project.repo}/blob/${project.slug === 'jvms' ? 'new' : 'main'}/LICENSE`}
            >Repository license</a
          >
        </li>{/each}
    </ul>
    <p>
      Windows VM has no specified repository license. News-Go and KJV Bible state MIT in their
      READMEs but had no standalone license file detected in this snapshot. Their data and
      third-party content may carry separate rights.
    </p>
  </section>
  <section>
    <h2>Original interface captures</h2>
    <ul>
      <li>
        <a href="https://github.com/renniemaharaj/go-web-framework/blob/main/assets/README.md"
          >Go Web Framework screenshots</a
        > are original application captures using synthetic demo content and custom branding.
      </li>
      <li>
        <a href="https://github.com/renniemaharaj/aircon/blob/main/docs/images/README.md"
          >Aircon screenshots</a
        > are earlier physical Android test captures. They illustrate the documented interface and may
        differ from the current application.
      </li>
      <li>
        <a href="https://github.com/renniemaharaj/chronicle/blob/main/docs/assets.md"
          >Chronicle screenshots</a
        >
        are original interface captures from the repository. Map data ©
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, available
        under the Open Database License. Original screenshot map attribution is retained.
      </li>
      <li>
        <a href="https://github.com/ystyle/jvms/pull/75">JVMS terminal UI screenshot</a> was supplied
        by Rennie with his upstream contribution. JVMS remains the work of its upstream maintainers and
        contributors.
      </li>
    </ul>
    <p>
      Images are resized and encoded as WebP for delivery. Architecture compositions for Go API Kit
      and Frappe Docker are explanatory diagrams based on the documented systems, not application
      screenshots.
    </p>
  </section>
  <section>
    <h2>Portrait &amp; type</h2>
    <p>
      Rennie’s supplied portrait matches his <a href="https://github.com/renniemaharaj"
        >GitHub profile image</a
      >. Manrope is served locally under the
      <a href="/fonts/MANROPE-LICENSE.txt">SIL Open Font License</a>. Georgia uses the reader’s
      installed system font. No third-party font service is contacted.
    </p>
  </section>
  <section>
    <h2>Privacy</h2>
    <p>
      This static portfolio has no contact form backend, advertising trackers, or analytics
      integrations. Contact links open your email or phone application. External source links take
      you to their respective services. Standard hosting request logs depend on the deployment
      provider. Read the <a href="/privacy-policy/">Privacy Policy</a> and
      <a href="/cookie-policy/">Cookie Policy</a> for more information.
    </p>
  </section>
  <a class="text-link" href="/">Return to the portfolio</a>
</main>

<style>
  .credits {
    max-width: 850px;
    padding-block: 10rem 5rem;
  }

  h1 {
    font-weight: 500;
  }

  .intro {
    margin-block: 2rem 3rem;
    font-size: 1.15rem;
    color: var(--muted);
  }

  section {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  section p,
  li {
    color: var(--muted);
    line-height: 1.8;
  }

  li + li {
    margin-top: 0.8rem;
  }

  section a {
    text-decoration: underline;
    text-underline-offset: 3px;
    color: var(--green-dark);
  }
</style>
