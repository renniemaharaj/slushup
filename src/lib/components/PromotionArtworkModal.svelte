<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { X } from '@lucide/svelte';
  import Button from './Button.svelte';
  import { business } from '#lib/content/business.ts';
  import { promotionValidity, type Promotion } from '#lib/content/promotions.ts';

  let {
    open = $bindable(false),
    promotion,
    returnFocus
  }: {
    open: boolean;
    promotion: Promotion;
    returnFocus: HTMLElement | null;
  } = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content
      class="dialog-content promotion-modal"
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        returnFocus?.focus({ preventScroll: true });
      }}
    >
      <div class="modal-heading">
        <Dialog.Title class="promotion-modal-title">{promotion.title}</Dialog.Title>
        <Dialog.Close class="dialog-close" aria-label="Close promotion"
          ><X size={21} aria-hidden="true" /></Dialog.Close
        >
      </div>
      <Dialog.Description class="promotion-modal-description"
        >{promotion.description} Valid {promotionValidity(promotion)}.</Dialog.Description
      >
      <div class="artwork-frame">
        <img
          src={promotion.artwork}
          alt={`${promotion.title}. ${promotion.description} Valid ${promotionValidity(promotion)}.`}
        />
      </div>
      <div class="modal-actions">
        <Button href={promotion.ctaHref ?? business.booking} variant="secondary" size="small"
          >Plan your celebration</Button
        >
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.promotion-modal) {
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    width: min(780px, calc(100% - 2rem));
    max-height: calc(100dvh - 2rem);
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  .modal-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  :global(.promotion-modal-title) {
    font-size: 1rem;
    font-weight: 700;
  }
  :global(.promotion-modal-description) {
    margin-block: 0.5rem 0.8rem;
    color: var(--on-dark);
    font-size: var(--text-small);
    line-height: 1.5;
  }
  .artwork-frame {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }
  img {
    width: 100%;
    height: min(62dvh, 900px);
    object-fit: contain;
  }
  .modal-actions {
    display: flex;
    justify-content: center;
    padding-top: 0.8rem;
  }
  @media (max-width: 540px) {
    :global(.promotion-modal) {
      padding: 0.8rem;
    }
    img {
      height: 56dvh;
    }
  }
</style>
