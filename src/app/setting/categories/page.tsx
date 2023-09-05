import SettingCategoriesMain from '@/app/setting/categories/_main/SettingCategoriesMain';
import { graphql } from '@/dao/generated/preset';
import dateTimeToStringDate from '@/logics/dateTimeToStringDate';
import { labelsType, maxAmountType, nameType } from '@/models/category';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { DateTime } from 'luxon';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const settingCategoriesPageDocument = graphql(`
  query settingCategoriesPage($targetDate: String!) {
    listCategories(targetDate: $targetDate) {
      id
      name
      maxAmount
      labels {
        id
        name
      }
    }
    listCategoryLabels {
      id
      name
    }
  }
`);

const categoriesSchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
    maxAmount: maxAmountType,
    labels: labelsType
  }),
);

const categoryLabelsSchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
  }),
);

export default async function page() {
  const { cookie } = await checkSessionOnServer('/categories');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const result = await getClient().query(
      settingCategoriesPageDocument,
      {
        targetDate: dateTimeToStringDate(DateTime.now())
      },
    );
    if (result.error) {
      throw result.error;
    }
    const categories = categoriesSchema.parse(result.data?.listCategories);
    const labels = categoryLabelsSchema.parse(result.data?.listCategoryLabels)
    return <SettingCategoriesMain categories={categories} labels={labels}/>;
  } catch (error) {
    console.error({ error });
    notFound();
  }
}
