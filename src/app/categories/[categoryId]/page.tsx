import CategoryMain from '@/app/categories/[categoryId]/_main/CategoryMain';
import { graphql } from '@/dao/generated/preset';
import { currentAmountType, maxAmountType, nameType } from '@/models/category';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const categoryPageDocument = graphql(`
  query categoryPage($categoryId: Int!) {
    category(categoryId: $categoryId) {
      id
      name
      maxAmount
      currentAmount
    }
  }
`);

const pageParamSchema = z.object({
  categoryId: z.coerce.number(),
});

const categorySchema = z.object({
  id: z.number(),
  name: nameType,
  maxAmount: maxAmountType,
  currentAmount: currentAmountType,
});

export default async function Home({
  params,
}: {
  params: { categoryId: unknown };
}) {
  const categoryId = pageParamSchema.parse(params).categoryId;
  const { cookie } = await checkSessionOnServer(`/categories/${categoryId}/`);
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const res = await getClient().query(categoryPageDocument, {
      categoryId,
    });
    if (res.error) throw res.error;
    const result = categorySchema.parse(res.data?.category);
    return <CategoryMain category={result} />;
  } catch (e) {
    notFound();
  }
}
