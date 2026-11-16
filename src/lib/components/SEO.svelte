<script lang="ts">
  import { profile } from '#lib/content/profile.ts';

  let {
    title = 'Rennie Maharaj | Software Engineer & Integrations Consultant',
    description = 'Practical software, thoughtful architecture. Rennie Maharaj builds web applications, backend systems, developer tools, and enterprise integrations from Trinidad and Tobago.',
    path = '/',
    type = 'website',
    structuredData
  }: {
    title?: string;
    description?: string;
    path?: string;
    type?: string;
    structuredData?: Record<string, unknown>;
  } = $props();

  const canonical = $derived(`${profile.origin}${path}`);
  const image = `${profile.origin}/og-rennie.jpg`;
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: profile.origin,
    image: `${profile.origin}/projects/rennie-maharaj.webp`,
    jobTitle: profile.role,
    email: profile.email,
    telephone: profile.telephone,
    sameAs: [profile.github, profile.linkedin],
    homeLocation: { '@type': 'Country', name: 'Trinidad and Tobago' }
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content={profile.name} />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href={canonical} />
  <link
    rel="preload"
    href="/fonts/manrope-latin-variable.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <meta property="og:type" content={type} />
  <meta property="og:site_name" content="Rennie Maharaj · TheWriterCo" />
  <meta property="og:locale" content="en_TT" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={image} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="Rennie Maharaj, Software Engineer & Integrations Consultant"
  />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData ?? person).replace(/</g, '\\u003c')}</script>`}
</svelte:head>
