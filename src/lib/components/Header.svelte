<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { Menu, X, Phone, ArrowUpRight } from '@lucide/svelte';
  import Brand from './Brand.svelte';
  import Button from './Button.svelte';
  import { profile, navigation } from '#lib/content/profile.ts';

  let { solid = true }: { solid?: boolean } = $props();
  let open = $state(false);
</script>

<a href="#main" class="skip-link">Skip to content</a>
<div class="header-anchor">
  <header class:solid class="dark">
    <div class="header-inner">
      <Brand />
      <nav aria-label="Main navigation" class="desktop-nav">
        {#each navigation as item}
          <a href={item.href}>{item.label}</a>
        {/each}
      </nav>
      <div class="header-actions">
        <a href={`tel:${profile.telephone}`} class="phone" aria-label="Call Rennie Maharaj">
          <Phone size={17} aria-hidden="true" />
        </a>
        <Button href={`mailto:${profile.email}`} size="small" variant="secondary">Let’s talk</Button
        >
        <Dialog.Root bind:open>
          <Dialog.Trigger class="menu-trigger" aria-label="Open menu">
            <Menu size={23} aria-hidden="true" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay class="dialog-overlay" />
            <Dialog.Content class="dialog-content mobile-menu">
              <div class="menu-top">
                <Dialog.Title class="menu-title"
                  >Thoughtful software. Practical systems.</Dialog.Title
                >
                <Dialog.Close class="dialog-close" aria-label="Close menu">
                  <X size={20} aria-hidden="true" />
                </Dialog.Close>
              </div>
              <Dialog.Description class="sr-only"
                >Explore my work, engineering capabilities, and consulting services.</Dialog.Description
              >
              <nav aria-label="Mobile navigation">
                {#each navigation as item}
                  <a href={item.href} onclick={() => (open = false)}>
                    {item.label}
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </a>
                {/each}
              </nav>
              <Button href={`mailto:${profile.email}`} variant="secondary">Discuss a project</Button
              >
              <a class="menu-contact" href={profile.github}
                >Explore my GitHub <ArrowUpRight size={16} aria-hidden="true" /></a
              >
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  </header>
</div>

<style>
  .skip-link {
    position: fixed;
    top: -100px;
    left: 1rem;
    z-index: 200;
    padding: 1rem;
    color: var(--forest);
    background: var(--lime);
  }

  .skip-link:focus {
    top: 1rem;
  }

  /* Keep the header on native sticky positioning across route transitions. */
  .header-anchor {
    position: sticky;
    top: 0;
    z-index: 50;
    height: 0;
  }

  header {
    position: absolute;
    inset: 1.25rem var(--gutter) auto;
    max-width: 1320px;
    margin-inline: auto;
    background: var(--glass);
    border: 1px solid var(--line-dark);
    border-radius: 999px;
    backdrop-filter: blur(20px);
    transition:
      background var(--normal),
      box-shadow var(--normal);
  }

  header.solid {
    background: var(--forest-deep);
    box-shadow: var(--shadow);
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    height: 76px;
    padding-inline: 0.75rem;
  }

  .header-inner :global(.brand img) {
    width: 48px;
    height: 48px;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 2.3vw, 2.2rem);
  }

  .desktop-nav a {
    padding-block: 0.9rem;
    font-size: var(--text-small);
    font-weight: 600;
    transition: color var(--fast);
  }

  .desktop-nav a:hover {
    color: var(--lime);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .phone {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line-dark);
    border-radius: 50%;
  }

  :global(.menu-trigger) {
    display: none;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    color: var(--ivory);
    background: transparent;
    border: 1px solid var(--line-dark);
    border-radius: 50%;
  }

  :global(.mobile-menu) {
    inset: 1rem 1rem auto;
    max-width: 480px;
    max-height: calc(100dvh - 2rem);
    margin-left: auto;
    padding: 1.5rem;
    overflow-y: auto;
  }

  .menu-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  :global(.menu-title) {
    font-size: var(--text-small);
    font-weight: 500;
    color: var(--on-dark);
  }

  :global(.mobile-menu nav) {
    display: grid;
    margin-bottom: 1.5rem;
  }

  :global(.mobile-menu nav a) {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-block: 1.2rem;
    border-bottom: 1px solid var(--line-dark);
    font-size: 1.5rem;
    font-weight: 600;
  }

  :global(.mobile-menu nav a svg) {
    margin-left: auto;
  }

  .menu-contact {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    font-size: var(--text-small);
  }

  @media (max-width: 900px) {
    header {
      inset: 0.75rem 1rem auto;
    }

    .header-inner {
      height: 65px;
      gap: 0.5rem;
      padding-inline: 0.6rem;
    }

    .header-inner :global(.brand img) {
      width: 44px;
      height: 44px;
    }

    .desktop-nav,
    .phone {
      display: none;
    }

    :global(.menu-trigger) {
      display: grid;
    }

    .header-actions {
      gap: 0.5rem;
    }
  }

  @media (max-width: 390px) {
    .header-inner :global(.button) {
      gap: 0.4rem;
      padding-inline: 0.85rem;
    }
  }
</style>
