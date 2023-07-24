import { z } from 'zod';

export const paymentDateType = z.string();

export const priceType = z.coerce.number().gte(1).lte(999999);

export const noteType = z.string().nullable();
