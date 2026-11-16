import { describe, expect, it } from 'vitest';
import { businessSchema } from '../src/lib/content/validation.server';
import { business } from '../src/lib/content/business';
import { albums, filterGallery, gallery, parseAlbum } from '../src/lib/content/gallery';
import { existsSync } from 'node:fs';

// These are migration contracts from the original application.
describe('preserved business destinations', () => {
  it('keeps the original booking form and contact number', () => {
    expect(() => businessSchema.parse(business)).not.toThrow();
    expect(business.booking).toBe(
      'https://docs.google.com/forms/d/1HhmbzN6esy_Y-aFH37kuYePjXYxKx-KiR8Lh6tjUCws/viewform'
    );
    expect(business.whatsapp).toBe('https://wa.me/18687847976');
    expect(business.telephone).toBe('+18687847976');
  });
});

describe('gallery migration', () => {
  it('retains the twenty original photos and adds all eleven supplied photos', () => {
    expect(gallery).toHaveLength(31);
    expect(gallery.filter((item) => !item.id.startsWith('new-'))).toHaveLength(20);
    expect(new Set(gallery.map((item) => item.image)).size).toBe(31);
    expect(filterGallery('bars')).toHaveLength(5);
    expect(filterGallery('drinks')).toHaveLength(19);
    expect(filterGallery('moments')).toHaveLength(7);
    expect(albums.map((album) => album.key)).toEqual(['all', 'bars', 'drinks', 'moments']);

    for (const item of gallery) {
      expect(existsSync(`public/${item.image}`)).toBe(true);
      expect(existsSync(`src/lib/assets/${item.image}`)).toBe(true);
    }
  });

  it('accepts original deep links and rejects invalid categories', () => {
    expect(parseAlbum('bars')).toBe('bars');
    expect(parseAlbum('drinks')).toBe('drinks');
    expect(parseAlbum('moments')).toBe('moments');
    expect(parseAlbum(null)).toBe('all');
    expect(parseAlbum('<script>')).toBe('all');
    expect(filterGallery('all')).toHaveLength(31);
  });
});
