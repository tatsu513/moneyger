/* @server-only */
import { options } from '@/pages/api/auth/[...nextauth]';
import { CustomSession } from '@/types/sessionType';
import { getServerSession } from 'next-auth';
import { headers } from 'next/dist/client/components/headers';
import { redirect } from 'next/navigation';

const checkSessionOnServer = async (pathname: string) => {
  const cookie = headers().get('cookie');
  const session: CustomSession | null = await getServerSession(options);
  if (!session || !cookie) {
    redirect(`/auth/login?callbackUrl=${pathname}`);
  }
  return { session, cookie };
};

export default checkSessionOnServer;
