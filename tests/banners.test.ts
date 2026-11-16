import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  activePromotions,
  isPromotionActive,
  promotionValidity,
  promotionVersion,
  promotions,
  type Promotion
} from '../src/lib/content/promotions';
import { cookieConsent, parseConsent, saveConsent } from '../src/lib/consent/preferences';
import { startOptionalIntegrations } from '../src/lib/consent/optional-integrations';

const promotion = promotions[0];
const activeTime = Date.parse('2026-11-15T12:00:00-04:00');
afterEach(() => cookieConsent.set(null));

describe('promotion scheduling', () => {
  it('includes the first instant and every moment of Dec 31, excluding Jan 1', () => {
    expect(isPromotionActive(promotion, Date.parse(promotion.startsAt) - 1)).toBe(false);
    expect(isPromotionActive(promotion, Date.parse(promotion.startsAt))).toBe(true);
    expect(isPromotionActive(promotion, Date.parse(promotion.endsAt) - 1)).toBe(true);
    expect(isPromotionActive(promotion, Date.parse(promotion.endsAt))).toBe(false);
    expect(promotionValidity(promotion)).toContain('31 Dec 2026');
  });

  it('fails closed for disabled, invalid, backwards, and timezone-free schedules', () => {
    for (const change of [
      { enabled: false },
      { endsAt: 'invalid' },
      { startsAt: promotion.endsAt },
      { startsAt: '2026-10-01T00:00:00' }
    ]) {
      expect(isPromotionActive({ ...promotion, ...change }, activeTime)).toBe(false);
    }
  });

  it('sorts simultaneous promotions by priority without changing the source', () => {
    const items: Promotion[] = [
      { ...promotion, id: 'low', priority: 1 },
      { ...promotion, id: 'off', enabled: false },
      { ...promotion, id: 'high', priority: 200 }
    ];
    expect(activePromotions(items, activeTime).map((item) => item.id)).toEqual(['high', 'low']);
    expect(items[0].id).toBe('low');
    expect(promotionVersion({ ...promotion, version: '2' })).not.toBe(promotionVersion(promotion));
  });
});

describe('optional cookie consent', () => {
  it('rejects malformed and outdated stored choices', () => {
    for (const raw of [
      null,
      '{',
      '{}',
      JSON.stringify({ version: 0, necessary: true }),
      JSON.stringify({
        version: 1,
        necessary: true,
        analytics: 'yes',
        marketing: false,
        updatedAt: new Date().toISOString()
      })
    ]) {
      expect(parseConsent(raw)).toBeNull();
    }
  });

  it('loads only opted-in categories and tears them down on withdrawal', async () => {
    const analyticsCleanup = vi.fn();
    const analytics = vi.fn(() => analyticsCleanup);
    const marketing = vi.fn(() => vi.fn());
    const stop = startOptionalIntegrations([
      { id: 'analytics', category: 'analytics', enable: analytics },
      { id: 'marketing', category: 'marketing', enable: marketing }
    ]);
    try {
      await Promise.resolve();
      expect(analytics).not.toHaveBeenCalled();
      expect(marketing).not.toHaveBeenCalled();
      saveConsent({ analytics: true, marketing: false });
      await vi.waitFor(() => expect(analytics).toHaveBeenCalledTimes(1));
      expect(marketing).not.toHaveBeenCalled();
      saveConsent({ analytics: false, marketing: false });
      expect(analyticsCleanup).toHaveBeenCalledTimes(1);
    } finally {
      stop();
    }
  });

  it('cleans up an integration that finishes loading after consent is withdrawn', async () => {
    const cleanup = vi.fn();
    let finish!: (value: () => void) => void;
    const enable = vi.fn(
      () =>
        new Promise<() => void>((resolve) => {
          finish = resolve;
        })
    );
    const stop = startOptionalIntegrations([{ id: 'delayed', category: 'analytics', enable }]);
    try {
      saveConsent({ analytics: true, marketing: false });
      await vi.waitFor(() => expect(enable).toHaveBeenCalledOnce());
      saveConsent({ analytics: false, marketing: false });
      finish(cleanup);
      await vi.waitFor(() => expect(cleanup).toHaveBeenCalledOnce());
    } finally {
      stop();
    }
  });
});
