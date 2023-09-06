import SettingLabelsMain from '@/app/setting/labels/_main/SettingLabelsMain';
import { graphql } from '@/dao/generated/preset';
import { nameType } from '@/models/category';
import checkSessionOnServer from '@/util/checkSessionOnServer';
import registerRscUrqlClient from '@/util/registerRscUrqlClient';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const settingLablesPageDocument = graphql(`
  query settingLabelsPage {
    listCategoryLabels {
      id
      name
    }
  }
`);

const labelsSchema = z.array(
  z.object({
    id: z.number(),
    name: nameType,
  }),
);

export default async function page() {
  const { cookie } = await checkSessionOnServer('/categories');
  const { getClient } = registerRscUrqlClient(cookie);
  try {
    const result = await getClient().query(settingLablesPageDocument, {});
    if (result.error) {
      throw result.error;
    }
    const labels = labelsSchema.parse(result.data?.listCategoryLabels);
    return <SettingLabelsMain labels={labels} />;
  } catch (error) {
    console.error({ error });
    notFound();
  }
}
