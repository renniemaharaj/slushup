<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { Play, X, Check, ArrowUpRight } from '@lucide/svelte';
  import Media from './Media.svelte';
  import Button from './Button.svelte';
  import { business } from '#lib/content/business.ts';

  let videoOpen = $state(false);
</script>

<section id="experience" class="section experience" aria-labelledby="experience-title">
  <div class="container composition">
    <div class="experience-media">
      <div class="orbit" aria-hidden="true"></div>
      <div class="main-photo">
        <Media
          name="garden-mocktail-bar.jpeg"
          alt="A SlushUp bartender preparing pineapple-garnished mocktails beside a personalised garden party menu"
          sizes="(min-width: 900px) 40vw, 90vw"
          position="center 57%"
        />
      </div>
      <div class="small-photo">
        <Media
          name="mint-cocktail.jpeg"
          alt="A chilled SlushUp drink with fresh mint and ice"
          sizes="180px"
        />
      </div>
      <Dialog.Root bind:open={videoOpen}>
        <Dialog.Trigger class="watch-button">
          <span class="play-icon"><Play size={17} fill="currentColor" aria-hidden="true" /></span>
          <span><strong>Meet your mobile bar</strong><small>Watch the SlushUp setup</small></span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay class="dialog-overlay" />
          <Dialog.Content class="dialog-content video-modal">
            <div class="video-heading">
              <Dialog.Title>Meet your mobile bar</Dialog.Title>
              <Dialog.Close class="dialog-close" aria-label="Close video"
                ><X size={20} aria-hidden="true" /></Dialog.Close
              >
            </div>
            <Dialog.Description class="sr-only"
              >A silent short film of the authentic SlushUp mobile bar setup. Use the native video
              controls to play.</Dialog.Description
            >
            {#if videoOpen}
              <video controls playsinline preload="metadata" poster="/cart-white-hero.jpeg">
                <source src="/setup-tour.mp4" type="video/mp4" />
                <track
                  kind="captions"
                  src="/setup-captions.vtt"
                  srclang="en"
                  label="English"
                  default
                />
                <p>
                  Your browser does not support video. <a href="/setup-tour.mp4"
                    >Download the setup film.</a
                  >
                </p>
              </video>
            {/if}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
    <div class="experience-copy">
      <h2 id="experience-title">You make the memories.<br />We'll bring the magic.</h2>
      <p class="lead">
        From intimate gatherings to life's biggest celebrations, we bring premium beverages, a
        beautiful bar, and an experienced team. All you have to do is enjoy the moment.
      </p>
      <ul>
        {#each ['Custom drink menus, made for your occasion', 'A complete mobile bar, wherever you celebrate', 'Experienced bartenders who take care of it all'] as benefit}
          <li><span><Check size={13} strokeWidth={3} aria-hidden="true" /></span>{benefit}</li>
        {/each}
      </ul>
      <Button href={business.booking}>Book Your SlushUp</Button>
    </div>
  </div>
</section>

<style>
  .experience {
    overflow: clip;
    padding-top: 3.5rem;
    padding-bottom: 7rem;
  }

  .composition {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: clamp(3rem, 7vw, 7rem);
  }

  .experience-media {
    position: relative;
    max-width: 530px;
    padding: 1rem 2rem 1rem 1rem;
  }

  .main-photo {
    position: relative;
    aspect-ratio: 1.05;
    overflow: hidden;
    border-radius: 2.5rem 0.8rem 2.5rem 0.8rem;
    transform: rotate(-4deg);
    box-shadow: var(--shadow);
  }

  .orbit {
    position: absolute;
    inset: 8% -1% 10% -4%;
    border: 1px solid var(--green);
    border-radius: 50%;
    transform: rotate(29deg);
  }

  .small-photo {
    position: absolute;
    right: 0;
    bottom: -1rem;
    width: 28%;
    aspect-ratio: 0.8;
    overflow: hidden;
    border: 6px solid var(--ivory);
    border-radius: 1rem;
    transform: rotate(8deg);
    box-shadow: var(--shadow);
  }

  :global(.watch-button) {
    position: absolute;
    left: 0;
    bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.7rem 1rem 0.7rem 0.7rem;
    color: var(--ink);
    background: var(--paper);
    border: none;
    border-radius: 999px;
    box-shadow: var(--shadow);
  }

  .play-icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    color: var(--green);
    background: var(--ivory);
    border-radius: 50%;
  }

  :global(.watch-button) strong,
  :global(.watch-button) small {
    display: block;
    text-align: left;
  }

  :global(.watch-button) strong {
    font-size: var(--text-small);
  }

  :global(.watch-button) small {
    margin-top: 0.2rem;
    color: var(--muted);
    font-size: var(--text-small);
  }

  .lead {
    max-width: 480px;
    margin-top: 1.4rem;
  }

  ul {
    display: grid;
    gap: 0.8rem;
    padding: 0;
    margin: 1.6rem 0 2rem;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: var(--text-small);
    line-height: 1.5;
  }

  li span {
    display: grid;
    place-items: center;
    flex: 0 0 19px;
    height: 19px;
    color: var(--forest);
    background: var(--lime);
    border-radius: 50%;
  }

  :global(.video-modal) {
    inset: 50% auto auto 50%;
    width: min(650px, calc(100% - 2rem));
    max-height: 90dvh;
    padding: 1rem;
    transform: translate(-50%, -50%);
    overflow-y: auto;
  }

  .video-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 0.5rem 1rem;
    font-size: 1rem;
  }

  video {
    width: 100%;
    max-height: 70dvh;
    border-radius: 1rem;
    background: var(--forest-deep);
  }

  @media (max-width: 900px) {
    .composition {
      grid-template-columns: 1fr;
      gap: 4rem;
    }

    .experience-media {
      width: 100%;
      margin-inline: auto;
    }

    .experience-copy {
      max-width: 600px;
    }

    .experience {
      overflow: clip;
      padding-top: 2rem;
      padding-bottom: 5rem;
    }
  }
</style>
