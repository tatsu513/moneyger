import CategoriesMain from '@/app/setting/_main/CategoriesMain';
import { graphql } from '@/dao/generated/preset';
import { maxAmountType, nameType } from '@/models/category';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const categoriesPageDocument = graphql(`
  query categoriesPage {
    listCategories {
      id
      name
      maxAmount
    }
  }
`);

const categoriesSchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
    maxAmount: maxAmountType,
  }),
);

export default async function page() {
  const { cookie } = await checkSessionOnServer('/categories');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const result = await getClient().query(
      categoriesPageDocument,
      {},
      { suspense: true },
    );
    if (result.error) {
      throw result.error;
    }
    const categories = categoriesSchema.parse(result.data?.listCategories);
    return <CategoriesMain categories={categories} />;
  } catch (error) {
    console.error({ error });
    notFound();
  }
}
