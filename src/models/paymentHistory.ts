import { DateTime } from 'luxon';
import { z } from 'zod';

export const paymentDateType = z.custom<DateTime>(
  (val) => val instanceof DateTime,
);

export const priceType = z.coerce.number().gte(1).lte(999999);

export const noteType = z.string().nullable();

export const createPaymentHistorySchema = z.object({
  id: z.number(),
  paymentId: z.number(),
  paymentDate: z.string(),
  price: priceType,
  note: noteType,
});

export const editCreatePaymentHistorySchema = z.object({
  paymentId: z.number(),
  paymentDate: paymentDateType,
  price: priceType,
  note: noteType,
});
