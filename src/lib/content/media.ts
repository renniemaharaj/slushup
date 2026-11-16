export interface OptimizedImage {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

const images = import.meta.glob<OptimizedImage>('../assets/*.jpeg', {
  eager: true,
  query: { enhanced: true, format: 'avif;webp', w: '480;800;1200;1600' },
  import: 'default'
});

export function getImage(filename: string): OptimizedImage {
  const image = images[`../assets/${filename}`];

  if (!image) {
    throw new Error(`Missing SlushUp image: ${filename}`);
  }

  return image;
}
