'use client';
import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import MoneygerAppBar from '@/app/_layout/MoneygerAppBar';
import MoneygerBottomNavigation from '@/app/_layout/MoneygerBottomNavigation';
import { usePathname } from 'next/navigation';

const MainTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/logout';
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100dvh"
      width="100dvw"
      maxWidth="900px"
      m="0 auto"
      pt="env(safe-area-inset-top)"
      pr="env(safe-area-inset-right)"
      pb="env(safe-area-inset-bottom)"
      pl="env(safe-area-inset-left)"
    >
      <MoneygerAppBar isAuthPage={isAuthPage} />
      <Box display="flex" flexDirection="column" height="calc(100% - 56px)">
        <Box flex={1} p={2} sx={{ overflowY: 'scroll' }}>
          {children}
        </Box>
        {!isAuthPage && <MoneygerBottomNavigation />}
      </Box>
    </Box>
  );
};

export default MainTemplate;
