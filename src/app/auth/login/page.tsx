import LoginMain from '@/app/auth/login/_main/LoginMain';
import { getProviders } from 'next-auth/react';

export default async function page() {
  const providers = await getProviders().then((res) => res);
  return <LoginMain providers={providers} />;
}
