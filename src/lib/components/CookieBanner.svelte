<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { Cookie, X } from '@lucide/svelte';
  import Banner from './Banner.svelte';
  import Button from './Button.svelte';
  import { cookieConsent, cookiePreferencesOpen, saveConsent } from '#lib/consent/preferences.ts';

  let { ready, reducedMotion = false }: { ready: boolean; reducedMotion?: boolean } = $props();
  let analytics = $state(false);
  let marketing = $state(false);
  let returnFocus: HTMLElement | null = null;

  $effect(() => {
    if ($cookiePreferencesOpen) {
      analytics = $cookieConsent?.analytics ?? false;
      marketing = $cookieConsent?.marketing ?? false;
    }
  });
</script>

{#if ready && !$cookieConsent}
  <Banner variant="cookie" label="Cookie choices" {reducedMotion}>
    {#snippet leading()}<Cookie size={28} strokeWidth={1.5} aria-hidden="true" />{/snippet}
    <h2>Your privacy, your choice</h2>
    <p>
      We save your choices on this device. Optional analytics and marketing stay off unless you
      allow them. <a href="/cookie-policy/">Cookie Policy</a>.
    </p>
    {#snippet actions()}
      <Button
        variant="outline"
        size="small"
        arrow={false}
        onclick={() => saveConsent({ analytics: false, marketing: false })}>Reject optional</Button
      >
      <Button
        variant="outline"
        size="small"
        arrow={false}
        onclick={() => cookiePreferencesOpen.set(true)}>Customize</Button
      >
      <Button
        variant="secondary"
        size="small"
        arrow={false}
        onclick={() => saveConsent({ analytics: true, marketing: true })}>Accept all</Button
      >
    {/snippet}
  </Banner>
{/if}

<Dialog.Root bind:open={$cookiePreferencesOpen}>
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content
      class="dialog-content cookie-preferences"
      onOpenAutoFocus={() => {
        returnFocus = document.activeElement as HTMLElement;
      }}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        returnFocus?.focus({ preventScroll: true });
      }}
    >
      <div class="preferences-heading">
        <Dialog.Title class="preferences-title">Cookie preferences</Dialog.Title>
        <Dialog.Close class="dialog-close" aria-label="Close cookie preferences"
          ><X size={20} aria-hidden="true" /></Dialog.Close
        >
      </div>
      <Dialog.Description class="preferences-description"
        >Choose which optional features you allow. You can change your choices at any time from the
        footer. No optional tracking services are currently configured.</Dialog.Description
      >
      <div class="preference-option">
        <label
          ><input type="checkbox" checked disabled /> Necessary storage
          <span>Always on</span></label
        >
        <p>Remembers your consent and dismissed promotions on this device.</p>
      </div>
      <div class="preference-option">
        <label><input type="checkbox" bind:checked={analytics} /> Optional analytics</label>
        <p>Allow usage measurement if an analytics service is introduced.</p>
      </div>
      <div class="preference-option">
        <label><input type="checkbox" bind:checked={marketing} /> Optional marketing</label>
        <p>Allow marketing features if a marketing service is introduced.</p>
      </div>
      <div class="preferences-actions">
        <Button
          variant="outline"
          size="small"
          arrow={false}
          onclick={() => saveConsent({ analytics: false, marketing: false })}
          >Reject optional</Button
        >
        <Button
          variant="secondary"
          size="small"
          arrow={false}
          onclick={() => saveConsent({ analytics, marketing })}>Save preferences</Button
        >
      </div>
      <a class="policy-link" href="/cookie-policy/">Read our Cookie Policy</a>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  h2 {
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: -0.025em;
  }
  p {
    margin-top: 0.2rem;
    color: var(--on-dark);
    font-size: 0.8rem;
    line-height: 1.5;
  }
  a {
    color: var(--lime);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  :global(.cookie .banner-leading) {
    color: var(--lime);
  }
  :global(.cookie-preferences) {
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    width: min(560px, calc(100% - 2rem));
    max-height: calc(100dvh - 2rem);
    padding: 1.5rem;
    overflow: auto;
  }
  .preferences-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  :global(.preferences-title) {
    font-size: 1.3rem;
    font-weight: 700;
  }
  :global(.preferences-description) {
    margin-top: 1rem;
    color: var(--on-dark);
    font-size: var(--text-small);
    line-height: 1.7;
  }
  .preference-option {
    padding-block: 1rem;
    border-bottom: 1px solid var(--line-dark);
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: var(--text-small);
    font-weight: 600;
  }
  label span {
    margin-left: auto;
    color: var(--lime);
    font-size: 0.75rem;
  }
  input {
    width: 20px;
    height: 20px;
    accent-color: var(--lime);
  }
  .preferences-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.5rem;
  }
  .policy-link {
    display: inline-block;
    margin-top: 1rem;
    font-size: var(--text-small);
  }
  @media (max-width: 540px) {
    h2 {
      font-size: 0.9rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
</style>
