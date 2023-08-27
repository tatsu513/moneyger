'use client';
import CommonLoading from '@/components/common/CommonLoading';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import MainTemplate from '@/app/_layout/MainTemplate';

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

  // セッション情報読込中
  if (status === 'loading') return <CommonLoading />;

  // ログインしていない
  if (session == null) {
    redirect(`/auth/login?callbackUrl=${pathname}`);
  }
  return <MainTemplate>{children}</MainTemplate>;
};

export default ProtectedPage;
