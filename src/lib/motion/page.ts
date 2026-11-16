export async function initializeMotion(root: HTMLElement) {
  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis')
  ]);

  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add(
    '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
    () => {
      const lenis = new Lenis({
        autoRaf: false,
        duration: 0.85,
        smoothWheel: true,
        anchors: false,
        prevent: (node) => node.closest('[role="dialog"], [data-banner-scroll]') !== null
      });

      // Let SvelteKit and CSS own anchors; cancel wheel inertia before they navigate.
      const releaseAnchorScroll = (event: MouseEvent) => {
        const target = event.target;
        const anchor = target instanceof Element ? target.closest('a[href]') : null;
        if (!(anchor instanceof HTMLAnchorElement)) {
          return;
        }

        const destination = new URL(anchor.href);
        if (
          destination.origin === location.origin &&
          destination.pathname === location.pathname &&
          destination.search === location.search &&
          destination.hash
        ) {
          lenis.scrollTo(window.scrollY, { immediate: true });
        }
      };

      root.addEventListener('click', releaseAnchorScroll, true);
      lenis.on('scroll', ScrollTrigger.update);
      const clock = (seconds: number) => lenis.raf(seconds * 1000);
      gsap.ticker.add(clock);

      // Keep the only scroll-driven presentation on the hero photograph.
      gsap.to(root.querySelector('[data-parallax]'), {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('#hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      return () => {
        root.removeEventListener('click', releaseAnchorScroll, true);
        gsap.ticker.remove(clock);
        lenis.destroy();
      };
    },
    root
  );

  return () => media.revert();
}
