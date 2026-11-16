<script lang="ts">
  import { CalendarDays } from '@lucide/svelte';
  import Banner from './Banner.svelte';
  import Button from './Button.svelte';
  import { promotionValidity, type Promotion } from '#lib/content/promotions.ts';

  let {
    promotion,
    onopen,
    ondismiss,
    reducedMotion = false
  }: {
    promotion: Promotion;
    onopen: () => void;
    ondismiss: () => void;
    reducedMotion?: boolean;
  } = $props();
</script>

<Banner variant="promotion" label={promotion.title} onactivate={onopen} {ondismiss} {reducedMotion}>
  {#snippet leading()}
    <img src={promotion.preview ?? promotion.artwork} alt="" width="44" height="62" />
  {/snippet}
  <p class="validity">
    <CalendarDays size={14} aria-hidden="true" />{promotionValidity(promotion)}
  </p>
  <h2>{promotion.title}</h2>
  <p class="description">{promotion.description}</p>
  {#snippet actions()}
    <Button
      href={promotion.ctaHref}
      onclick={promotion.ctaHref ? undefined : onopen}
      variant="secondary"
      size="small"
    >
      {promotion.ctaLabel ?? 'View Promotion'}
    </Button>
  {/snippet}
</Banner>

<style>
  img {
    width: 44px;
    height: 62px;
    object-fit: contain;
    border-radius: 0.4rem;
  }
  .validity {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--lime);
    font-size: 0.7rem;
    line-height: 1.4;
    font-weight: 700;
  }
  h2 {
    margin-top: 0.15rem;
    font-size: 1rem;
    line-height: 1.4;
    letter-spacing: -0.025em;
    text-wrap: pretty;
  }
  .description {
    margin-top: 0.15rem;
    color: var(--on-dark);
    font-size: 0.8rem;
    line-height: 1.45;
  }
  @media (max-width: 540px) {
    h2 {
      font-size: 0.85rem;
    }
    .description {
      font-size: 0.75rem;
    }
    .validity {
      font-size: 0.65rem;
    }
    img {
      width: 38px;
      height: 57px;
    }
  }
</style>
