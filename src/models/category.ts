import { z } from 'zod';

export const nameType = z
  .string()
  .min(1, { message: '2~10文字で入力してください' })
  .max(10, { message: '2~10文字で入力してください' });

export const maxAmountType = z.coerce.number().gte(1).lte(999999);
export const currentAmountType = z.coerce.number().gte(0).lte(999999);
export const labelsType = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
);
