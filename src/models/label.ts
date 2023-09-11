import { z } from 'zod';

export const categoryIdType = z.number().nullable();

export const labelType = z
  .array(z.string().min(1, { message: '2~10文字で入力してください' }))
  .min(1);
