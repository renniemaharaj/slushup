import { Martini, GlassWater, Wine, Snowflake } from '@lucide/svelte';

export const services = [
  {
    id: 'mobile-bar',
    title: 'Mobile Bar',
    icon: Martini,
    description:
      'Your venue. Our bar. A fully equipped setup, premium pours, and a team that takes care of every detail.',
    details: [
      'Custom spirit selection',
      'Professional bartenders included',
      'Premium glassware & garnishes',
      'Full setup & teardown'
    ]
  },
  {
    id: 'cocktails',
    title: 'Signature Cocktails',
    icon: Wine,
    description:
      'Craft cocktails with character. Custom recipes inspired by your occasion and made to impress.',
    details: [
      'Custom recipe development',
      'Themed cocktail menus',
      'Seasonal ingredients',
      'Premium spirits & mixers'
    ]
  },
  {
    id: 'mocktails',
    title: 'Mocktails',
    icon: GlassWater,
    description:
      'All the celebration, without the alcohol. Beautifully crafted drinks with no compromise on flavour.',
    details: [
      'Sophisticated flavour profiles',
      'Premium juice selections',
      'Fresh fruit garnishes',
      'Alcohol-free options'
    ]
  },
  {
    id: 'frozen-treats',
    title: 'Frozen Treats',
    icon: Snowflake,
    description:
      'A little chill. A lot of flavour. Refreshing slushies, frozen cocktails, and dessert beverages.',
    details: [
      'Frozen cocktails & slushies',
      'Dessert beverages',
      'Custom flavours available',
      'Perfect for warm events'
    ]
  }
];

export type Service = (typeof services)[number];
