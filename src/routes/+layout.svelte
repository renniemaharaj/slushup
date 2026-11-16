<script lang="ts">
  import '../lib/styles/global.css';
  import BannerStack from '#lib/components/BannerStack.svelte';
  let { children } = $props();
</script>

<BannerStack />
{@render children()}
