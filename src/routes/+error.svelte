<script lang="ts">
  import { page } from '$app/state';
  import Button from '#lib/components/Button.svelte';
</script>

<svelte:head
  ><title>{page.status} | Rennie Maharaj</title><meta
    name="robots"
    content="noindex"
  /></svelte:head
>
<main id="main" class="container error-page" tabindex="-1">
  <p class="eyebrow">{page.status}</p>
  <h1>This page isn’t here.</h1>
  <p>There’s still plenty of work to explore.</p>
  <Button href="/">Back to the portfolio</Button>
</main>

<style>
  .error-page {
    padding-block: 12rem 6rem;
    min-height: 70vh;
  }

  p {
    margin-block: 1.5rem;
    color: var(--muted);
  }
</style>
