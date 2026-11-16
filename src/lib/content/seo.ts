import { business } from './business';

export const homeSEO = {
  title: 'SlushUp | Mobile Bar & Frozen Treats in Trinidad & Tobago',
  description:
    'SlushUp brings mobile bars, cocktails, mocktails and frozen treats to weddings, corporate events and celebrations across Trinidad & Tobago. Book your event.',
  canonical: `${business.origin}/`,
  locale: 'en_TT',
  language: 'en-TT',
  image: {
    url: `${business.origin}/og-slushup.jpg`,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'SlushUp green cocktails and strawberry frozen drinks with fruit garnishes at a mobile bar'
  }
} as const;

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${business.origin}/#organization`,
      name: business.name,
      url: homeSEO.canonical,
      logo: `${business.origin}/slushup-logo-512.webp`,
      image: { '@id': `${business.origin}/#sharing-image` },
      telephone: business.telephone,
      description: homeSEO.description,
      sameAs: [business.instagram, business.facebook],
      areaServed: {
        '@type': 'Country',
        name: 'Trinidad and Tobago'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: business.telephone,
        contactType: 'Bookings',
        availableLanguage: 'English'
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${business.origin}/#website`,
      url: homeSEO.canonical,
      name: business.name,
      description: homeSEO.description,
      inLanguage: homeSEO.language,
      publisher: { '@id': `${business.origin}/#organization` }
    },
    {
      '@type': 'WebPage',
      '@id': `${business.origin}/#webpage`,
      url: homeSEO.canonical,
      name: homeSEO.title,
      description: homeSEO.description,
      inLanguage: homeSEO.language,
      isPartOf: { '@id': `${business.origin}/#website` },
      about: { '@id': `${business.origin}/#organization` },
      primaryImageOfPage: { '@id': `${business.origin}/#sharing-image` }
    },
    {
      '@type': 'ImageObject',
      '@id': `${business.origin}/#sharing-image`,
      url: homeSEO.image.url,
      contentUrl: homeSEO.image.url,
      width: homeSEO.image.width,
      height: homeSEO.image.height,
      encodingFormat: homeSEO.image.type,
      caption: homeSEO.image.alt
    }
  ]
} as const;
