import { z } from 'zod';

export const businessSchema = z.object({
  name: z.string().min(1),
  origin: z.url(),
  booking: z.url(),
  whatsapp: z.url(),
  telephone: z.string().regex(/^\+\d{11}$/),
  instagram: z.url(),
  facebook: z.url()
});
