<script lang="ts">
  import { onMount } from 'svelte';
  import PromotionBanner from './PromotionBanner.svelte';
  import CookieBanner from './CookieBanner.svelte';
  import PromotionArtworkModal from './PromotionArtworkModal.svelte';
  import {
    activePromotions,
    promotions,
    promotionDismissalKey,
    promotionVersion,
    type Promotion
  } from '#lib/content/promotions.ts';
  import { consentStorageKey, initializeConsent } from '#lib/consent/preferences.ts';
  import { startOptionalIntegrations } from '#lib/consent/optional-integrations.ts';

  let ready = $state(false);
  let now = $state(0);
  let dismissed = $state<Record<string, string>>({});
  const volatileDismissals: Record<string, string> = {};
  let reducedMotion = $state(false);
  let selected = $state<Promotion | null>(null);
  let artworkOpen = $state(false);
  let returnFocus = $state<HTMLElement | null>(null);

  const scheduled = $derived(activePromotions(promotions, now));
  const visible = $derived(
    scheduled.filter((promotion) => dismissed[promotion.id] !== promotionVersion(promotion))
  );

  function readDismissals() {
    const values: Record<string, string> = { ...volatileDismissals };
    for (const promotion of promotions) {
      try {
        const version = localStorage.getItem(promotionDismissalKey(promotion.id));
        if (version) {
          values[promotion.id] = version;
        }
      } catch {
        // Keep the in-memory choice if browser storage is unavailable.
        return;
      }
    }
    dismissed = values;
  }

  function dismiss(promotion: Promotion) {
    const version = promotionVersion(promotion);
    dismissed = { ...dismissed, [promotion.id]: version };
    try {
      localStorage.setItem(promotionDismissalKey(promotion.id), version);
    } catch {
      volatileDismissals[promotion.id] = version;
    }
  }

  function openArtwork(promotion: Promotion) {
    returnFocus = document.activeElement as HTMLElement;
    selected = promotion;
    artworkOpen = true;
  }

  onMount(() => {
    initializeConsent();
    readDismissals();
    const stopIntegrations = startOptionalIntegrations();
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      reducedMotion = motion.matches;
    };
    updateMotion();
    motion.addEventListener('change', updateMotion);

    let timer: number;
    function tick() {
      clearTimeout(timer);
      now = Date.now();
      if (selected && !activePromotions([selected], now).length) {
        artworkOpen = false;
      }
      const boundaries = promotions
        .flatMap((promotion) => [Date.parse(promotion.startsAt), Date.parse(promotion.endsAt)])
        .filter((time) => time > now);
      const delay = Math.min(60000, ...boundaries.map((time) => time - now + 1));
      timer = window.setTimeout(tick, Math.max(1, delay));
    }
    tick();
    ready = true;

    function refresh() {
      tick();
      readDismissals();
    }
    function storage(event: StorageEvent) {
      if (event.key === null || event.key === consentStorageKey) {
        initializeConsent();
      }
      if (event.key === null || event.key?.startsWith('slushup:promotion:')) {
        readDismissals();
      }
    }
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refresh);
    window.addEventListener('storage', storage);
    document.addEventListener('visibilitychange', refresh);

    return () => {
      clearTimeout(timer);
      stopIntegrations();
      motion.removeEventListener('change', updateMotion);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('storage', storage);
      document.removeEventListener('visibilitychange', refresh);
    };
  });
</script>

<div class="banner-region">
  <aside class="banner-stack" aria-label="Promotions and cookie choices" data-banner-scroll>
    {#if ready}
      {#each visible as promotion (`${promotion.id}:${promotionVersion(promotion)}`)}
        <PromotionBanner
          {promotion}
          {reducedMotion}
          onopen={() => openArtwork(promotion)}
          ondismiss={() => dismiss(promotion)}
        />
      {/each}
    {/if}
    <CookieBanner {ready} {reducedMotion} />
  </aside>
</div>
{#if selected}
  <PromotionArtworkModal bind:open={artworkOpen} promotion={selected} {returnFocus} />
{/if}

<style>
  .banner-region {
    background: var(--forest-deep);
  }
  .banner-stack {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: min(1320px, calc(100% - var(--gutter) * 2));
    max-height: var(--banner-region-max-height);
    margin-inline: auto;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--green) transparent;
  }

  .banner-stack:has(:global(.banner)) {
    padding-block: 0.75rem;
  }
  @media (max-width: 900px) {
    .banner-stack {
      width: calc(100% - 2rem);
    }
  }
</style>
