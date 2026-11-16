import { business } from '#lib/content/business.ts';
import { businessSchema } from '#lib/content/validation.server.ts';

export function load() {
  businessSchema.parse(business);

  return {};
}
