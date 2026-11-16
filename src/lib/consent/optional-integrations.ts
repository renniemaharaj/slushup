import { cookieConsent } from './preferences';

export interface OptionalIntegration {
  id: string;
  category: 'analytics' | 'marketing';
  enable: () => (() => void) | Promise<() => void>;
}

// Add integrations here only with a cleanup that stops tracking and clears their cookies.
// Put SDK imports or script insertion inside enable so nothing loads before consent.
export const optionalIntegrations: OptionalIntegration[] = [];

export function startOptionalIntegrations(integrations = optionalIntegrations): () => void {
  const running = new Map<string, { cancelled: boolean; cleanup?: () => void }>();

  function stop(id: string) {
    const run = running.get(id);
    if (run) {
      run.cancelled = true;
      run.cleanup?.();
      running.delete(id);
    }
  }

  const unsubscribe = cookieConsent.subscribe((consent) => {
    for (const integration of integrations) {
      if (!consent?.[integration.category]) {
        stop(integration.id);
        continue;
      }
      if (running.has(integration.id)) {
        continue;
      }

      const run: { cancelled: boolean; cleanup?: () => void } = { cancelled: false };
      running.set(integration.id, run);
      Promise.resolve()
        .then(() => {
          if (run.cancelled) {
            return;
          }
          return integration.enable();
        })
        .then((cleanup) => {
          if (!cleanup) {
            return;
          }
          if (run.cancelled) {
            cleanup();
          } else {
            run.cleanup = cleanup;
          }
        })
        .catch(() => {
          if (running.get(integration.id) === run) {
            running.delete(integration.id);
          }
        });
    }
  });

  return () => {
    unsubscribe();
    for (const id of running.keys()) {
      stop(id);
    }
  };
}
