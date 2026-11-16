export type Album = 'all' | 'bars' | 'drinks' | 'moments';

export interface GalleryItem {
  id: string;
  image: string;
  category: Exclude<Album, 'all'>;
  caption: string;
}

export const albums: { key: Album; label: string }[] = [
  { key: 'all', label: 'All moments' },
  { key: 'bars', label: 'Bars' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'moments', label: 'Moments' }
];

export function parseAlbum(value: string | null): Album {
  if (value === 'bars' || value === 'drinks' || value === 'moments') {
    return value;
  }

  return 'all';
}

export const gallery: GalleryItem[] = [
  {
    id: 'new-birthday-slush-bar',
    image: 'birthday-slush-bar.jpeg',
    category: 'bars',
    caption: 'Blue and red slushies at a personalised birthday bar.'
  },
  {
    id: 'new-birthday-drink-menu',
    image: 'birthday-drink-menu.jpeg',
    category: 'drinks',
    caption: 'A colourful birthday drinks menu with three frozen favourites.'
  },
  {
    id: 'new-blue-birthday-slush',
    image: 'blue-birthday-slush.jpeg',
    category: 'drinks',
    caption: 'A bright blue birthday slush, served ice-cold with a candy garnish.'
  },
  {
    id: 'new-strawberry-cocktail-display',
    image: 'strawberry-cocktail-display.jpeg',
    category: 'drinks',
    caption: 'Strawberry-garnished drinks, ready to serve.'
  },
  {
    id: 'new-signature-drink-wall',
    image: 'signature-drink-wall.jpeg',
    category: 'bars',
    caption: 'The SlushUp drinks wall, ready for a wedding celebration.'
  },
  {
    id: 'new-layered-frozen-treat',
    image: 'layered-frozen-treat.jpeg',
    category: 'drinks',
    caption: 'A blue and red frozen treat with colourful candy garnishes.'
  },
  {
    id: 'new-garden-mocktail-bar',
    image: 'garden-mocktail-bar.jpeg',
    category: 'moments',
    caption: 'Preparing pineapple-garnished mocktails at a garden celebration.'
  },
  {
    id: 'new-mint-cocktail',
    image: 'mint-cocktail.jpeg',
    category: 'drinks',
    caption: 'Fresh mint and ice in a chilled SlushUp drink.'
  },
  {
    id: 'new-frozen-duo-menu',
    image: 'frozen-duo-menu.jpeg',
    category: 'drinks',
    caption: 'Two frozen favourites beside a personalised drinks menu.'
  },
  {
    id: 'new-blue-frozen-treat',
    image: 'blue-frozen-treat.jpeg',
    category: 'drinks',
    caption: 'A bright blue frozen treat at a birthday celebration.'
  },
  {
    id: 'new-watermelon-cocktail',
    image: 'watermelon-cocktail.jpeg',
    category: 'drinks',
    caption: 'A watermelon-garnished drink finished with fresh mint.'
  },
  {
    id: 'cheers',
    image: 'drinks-image-cheers-wide.jpeg',
    category: 'drinks',
    caption: 'A colourful line-up, ready for a toast.'
  },
  {
    id: 'drink-1',
    image: 'drink-image-watermelon.jpeg',
    category: 'drinks',
    caption: 'Watermelon, mint, and a little frozen magic.'
  },
  {
    id: 'bar-3',
    image: 'bar-image-3.jpeg',
    category: 'bars',
    caption: 'The SlushUp mobile bar, dressed for the occasion.'
  },
  {
    id: 'people-3',
    image: 'people-image-3.jpeg',
    category: 'moments',
    caption: 'Good drinks. Even better company.'
  },
  {
    id: 'drink-green',
    image: 'drink-image-green.jpeg',
    category: 'drinks',
    caption: 'Fresh colour, frozen flavour.'
  },
  {
    id: 'drink-3',
    image: 'drinks-image-sunset.jpeg',
    category: 'drinks',
    caption: 'Golden hour, the SlushUp way.'
  },
  {
    id: 'bar-1',
    image: 'bar-image.jpeg',
    category: 'bars',
    caption: 'Our mobile bar, ready to welcome your guests.'
  },
  {
    id: 'bar-2',
    image: 'bar-image-2.jpeg',
    category: 'bars',
    caption: 'A personalised bar setup for a celebration.'
  },
  {
    id: 'drink-yellow',
    image: 'drink-image-yellow.jpeg',
    category: 'drinks',
    caption: 'A bright pour with fresh fruit garnishes.'
  },
  {
    id: 'drink-2',
    image: 'drink-image-red-background-purple.jpeg',
    category: 'drinks',
    caption: 'A vibrant frozen drink at the bar.'
  },
  {
    id: 'signage',
    image: 'signage-image-purple.jpeg',
    category: 'drinks',
    caption: 'A custom SlushUp menu for the evening.'
  },
  {
    id: 'drink-baby-lucas-signage',
    image: 'drinks-image-baby-lucas-signage.jpeg',
    category: 'drinks',
    caption: 'A drinks menu made for Baby Lucas.'
  },
  {
    id: 'drink-many',
    image: 'drinks-image-many.jpeg',
    category: 'drinks',
    caption: 'A fresh line-up of SlushUp favourites.'
  },
  {
    id: 'drink-many-2',
    image: 'drinks-image-many-2.jpeg',
    category: 'drinks',
    caption: 'Drinks that bring colour to the celebration.'
  },
  {
    id: 'drink-cream',
    image: 'drinks-image-cream.jpeg',
    category: 'drinks',
    caption: 'Something creamy, cold, and refreshing.'
  },
  {
    id: 'moment-1',
    image: 'bar-image-with-people.jpeg',
    category: 'moments',
    caption: 'Celebrating together at the SlushUp bar.'
  },
  {
    id: 'people-1',
    image: 'people-image-1.jpeg',
    category: 'moments',
    caption: 'A SlushUp moment with our guests.'
  },
  {
    id: 'people-2',
    image: 'people-image-2.jpeg',
    category: 'moments',
    caption: 'The celebration, in full swing.'
  },
  {
    id: 'moment-2',
    image: 'bar-image-3-with-people.jpeg',
    category: 'moments',
    caption: 'A beautiful bar. A memorable gathering.'
  },
  {
    id: 'moment-3',
    image: 'bar-image-with-people-3-wide.jpeg',
    category: 'moments',
    caption: 'Fresh drinks, served with a smile.'
  }
];

export function filterGallery(album: Album): GalleryItem[] {
  if (album === 'all') {
    return gallery;
  }

  return gallery.filter((item) => item.category === album);
}
