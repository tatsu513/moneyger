import { redirect } from 'next/navigation';

export default async function page() {
  console.info('setting/categoriesに遷移します');
  redirect('/setting/categories');
}
