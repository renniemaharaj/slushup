import { writable } from 'svelte/store';

export interface CookieConsent {
  version: 1;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export const consentStorageKey = 'slushup:cookie-consent:v1';
export const cookieConsent = writable<CookieConsent | null>(null);
export const cookiePreferencesOpen = writable(false);

export function parseConsent(raw: string | null): CookieConsent | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (
      value?.version === 1 &&
      value.necessary === true &&
      typeof value.analytics === 'boolean' &&
      typeof value.marketing === 'boolean' &&
      typeof value.updatedAt === 'string' &&
      Number.isFinite(Date.parse(value.updatedAt))
    ) {
      return value;
    }
  } catch {
    // Invalid or unavailable storage leaves optional features disabled.
  }
  return null;
}

export function initializeConsent(): void {
  try {
    cookieConsent.set(parseConsent(localStorage.getItem(consentStorageKey)));
  } catch {
    cookieConsent.set(null);
  }
}

export function saveConsent(choices: { analytics: boolean; marketing: boolean }): void {
  const value: CookieConsent = {
    version: 1,
    necessary: true,
    analytics: choices.analytics,
    marketing: choices.marketing,
    updatedAt: new Date().toISOString()
  };
  cookieConsent.set(value);
  cookiePreferencesOpen.set(false);
  try {
    localStorage.setItem(consentStorageKey, JSON.stringify(value));
  } catch {
    // The choice still applies for this visit when persistence is unavailable.
  }
}
