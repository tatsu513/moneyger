/* @server-only */
import { headers } from 'next/dist/client/components/headers';
import { redirect } from 'next/navigation';

const checkSessionOnServer = async (pathname: string) => {
  const cookie = headers().get('cookie');
  if (!cookie) {
    redirect(`/auth/login?callbackUrl=${pathname}`);
  }
  return { cookie };
};

export default checkSessionOnServer;
