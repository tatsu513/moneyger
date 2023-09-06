import { DateTime } from 'luxon';
import { z } from 'zod';

export const paymentDateType = z.custom<DateTime>(
  (val) => val instanceof DateTime,
);

export const priceType = z.coerce.number().gte(1).lte(999999);

export const noteType = z.string().nullable();

export const categoryLabelIdsType = z.array(z.number())

export const categoryLabelsType = z.array(
  z.object({
    id: z.number(),
    name: z.string()
  })
)


export const createPaymentHistorySchema = z.object({
  categoryId: z.number(),
  paymentDate: z.string(),
  price: priceType,
  note: noteType,
  categoryLabelIds: categoryLabelIdsType
});

export const editCreatePaymentHistorySchema = z.object({
  categoryId: z.number(),
  paymentDate: paymentDateType,
  price: priceType,
  note: noteType,
  categoryLabels: categoryLabelsType
});
