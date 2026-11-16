import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

interface CarouselOptions {
  media?: string;
  options: EmblaOptionsType;
  onready?: (api: EmblaCarouselType) => void;
}

export function carousel(node: HTMLElement, config: CarouselOptions) {
  let disposed = false;
  let loading = false;
  let nearby = false;
  let cleanup: (() => void) | undefined;
  const media = config.media ? window.matchMedia(config.media) : undefined;

  async function initialize() {
    if (disposed || loading || cleanup || !nearby || (media && !media.matches)) {
      return;
    }

    loading = true;

    try {
      const { default: embla } = await import('embla-carousel-svelte');

      if (disposed || (media && !media.matches)) {
        return;
      }

      const ready = (event: Event) => {
        config.onready?.((event as CustomEvent<EmblaCarouselType>).detail);
      };

      node.addEventListener('emblaInit', ready);
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const options = () => ({
        ...config.options,
        duration: motion.matches ? 0 : (config.options.duration ?? 25)
      });
      const instance = embla(node, { options: options(), plugins: [] });
      const updateMotion = () => instance.update?.({ options: options(), plugins: [] });
      motion.addEventListener('change', updateMotion);
      node.dataset.enhanced = 'true';

      cleanup = () => {
        node.removeEventListener('emblaInit', ready);
        motion.removeEventListener('change', updateMotion);
        instance.destroy?.();
        delete node.dataset.enhanced;
      };
      observer.disconnect();
      media?.removeEventListener('change', initialize);
    } catch {
      // Native horizontal scrolling remains available if enhancement cannot load.
    } finally {
      loading = false;
    }
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      nearby = entry.isIntersecting;
      void initialize();
    },
    { rootMargin: '300px' }
  );

  observer.observe(node);
  media?.addEventListener('change', initialize);

  return {
    destroy() {
      disposed = true;
      observer.disconnect();
      media?.removeEventListener('change', initialize);
      cleanup?.();
    }
  };
}
