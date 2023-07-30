/* @server-only */
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const getSession = async (pathname: string): Promise<Session> => {
  const session = await getServerSession(options);
  console.log({ pathname, session });
  if (session == null) {
    redirect(`api/auth/signIn?callbackUrl=${pathname}`);
  }
  return session;
};

export default getSession;
