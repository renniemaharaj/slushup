<script lang="ts">
  let {
    size = 20,
    'aria-hidden': hidden = true
  }: { size?: number; 'aria-hidden'?: boolean | 'true' | 'false' } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={hidden}
  ><path
    d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.4 9H6.6V21H3.4ZM9 9h3v1.65C12.75 9.45 13.7 8.8 15.4 8.8c3 0 4.6 1.9 4.6 5.5V21h-3.2v-6.3c0-1.9-.7-2.9-2.1-2.9-1.55 0-2.5 1.1-2.5 3V21H9Z"
  /></svg
>
