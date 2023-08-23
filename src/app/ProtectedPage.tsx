import CommonLoading from '@/components/common/CommonLoading';
import { signIn, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type ProtectedPageProps = {
  children: React.ReactNode;
};

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // もしログインページかログアウトページならそのまま表示
  if (pathname === '/auth/login' || pathname === '/auth/logout') {
    return <>{children}</>;
  }

  // セッション情報読み込み中
  if (status === 'loading') return <CommonLoading />;

  // ログインしていない
  if (session == null) {
    signIn().catch((error) => {
      console.log({ err: error }, 'Failed to sign in')
    });
    return <></>;
  }
  return <>{children}</>;
};

export default ProtectedPage;
