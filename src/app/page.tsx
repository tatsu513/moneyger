import TopMain from '@/app/_main/TopMain';
import getSession from '@/util/getSession';

export default async function Home() {
  const session = await getSession('/');
  console.log({ session });
  return <TopMain />;
}
