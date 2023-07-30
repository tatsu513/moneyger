import LoginMain from '@/app/login/_main/LoginMain';
import { getProviders } from 'next-auth/react';

export default async function page() {
  const providers = await getProviders().then((res) => {
    console.log(res, '<<<<< : provider response');
    return res;
  });
  return <LoginMain providers={providers} />;
}
