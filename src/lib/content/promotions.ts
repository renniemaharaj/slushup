export interface Promotion {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  artwork: string;
  enabled: boolean;
  priority?: number;
  ctaLabel?: string;
  ctaHref?: string;
  version?: string;
  preview?: string;
}

export const promotionTimeZone = 'America/Port_of_Spain';

// Starts are inclusive; ends are exclusive. Midnight Jan 1 includes all of Dec 31.
export const promotions: Promotion[] = [
  {
    id: 'end-of-year-2026',
    version: '1',
    title: 'End of Year Discount — 20% Off Your Quotation',
    description: 'Perfect for weddings, corporate events, and birthday parties.',
    startsAt: '2026-10-01T00:00:00-04:00',
    endsAt: '2027-01-01T00:00:00-04:00',
    artwork: '/promotions/end-of-year-discount-2026.jpeg',
    preview: '/promotions/end-of-year-discount-2026-preview.webp',
    enabled: true,
    priority: 100,
    ctaLabel: 'View Promotion'
  }
];

export function isPromotionActive(promotion: Promotion, now: number): boolean {
  const explicitZone = /(?:Z|[+-]\d{2}:\d{2})$/;
  if (
    !promotion.enabled ||
    !explicitZone.test(promotion.startsAt) ||
    !explicitZone.test(promotion.endsAt)
  ) {
    return false;
  }

  const start = Date.parse(promotion.startsAt);
  const end = Date.parse(promotion.endsAt);
  return Number.isFinite(start) && Number.isFinite(end) && start < end && start <= now && now < end;
}

export function activePromotions(items: Promotion[], now: number): Promotion[] {
  return items
    .filter((item) => isPromotionActive(item, now))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0) || a.id.localeCompare(b.id));
}

export function promotionDismissalKey(id: string): string {
  return `slushup:promotion:${id}:dismissed-version`;
}

export function promotionVersion(promotion: Promotion): string {
  return promotion.version ?? '1';
}

export function promotionValidity(promotion: Promotion): string {
  const format = new Intl.DateTimeFormat('en-TT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: promotionTimeZone
  });
  return `${format.format(new Date(promotion.startsAt))} – ${format.format(new Date(Date.parse(promotion.endsAt) - 1))}`;
}
