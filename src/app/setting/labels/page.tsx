import SettingLabelsMain from '@/app/setting/labels/_main/SettingLabelsMain';
import { graphql } from '@/dao/generated/preset';
import { nameType } from '@/models/category';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const settingLabelsPageDocument = graphql(`
  query settingLabelsPage {
    listCategoryLabels {
      id
      name
      categoryId
    }
    listCategories {
      id
      name
    }
  }
`);

const settingLabelsSchema = z.object({
  listCategoryLabels: z.array(
    z.object({
      id: z.number(),
      name: nameType,
      categoryId: z.number().nullable(),
    }),
  ),
  listCategories: z.array(
    z.object({
      id: z.number(),
      name: nameType,
    }),
  ),
});

export default async function page() {
  const { cookie } = await checkSessionOnServer('/categories');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const result = await getClient().query(settingLabelsPageDocument, {});
    if (result.error) {
      console.error('ここですね');
      throw result.error;
    }
    const parseResult = settingLabelsSchema.parse(result.data);
    return (
      <SettingLabelsMain
        labels={parseResult.listCategoryLabels}
        categories={parseResult.listCategories}
      />
    );
  } catch (error) {
    console.error('ここでエラーが出ているよ');
    console.error({ error });
    notFound();
  }
}
