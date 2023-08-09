'use client';
import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import MoneygerAppBar from '@/components/common/MoneygerAppBar';
import MoneygerBottomNavigation from '@/components/common/MoneygerBottomNavigation';

const MainTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100dvh"
      pt="env(safe-area-inset-top)"
      pr="env(safe-area-inset-right)"
      pb="env(safe-area-inset-bottom)"
      pl="env(safe-area-inset-left)"
    >
      <MoneygerAppBar />
      <Box display="flex" flexDirection="column" height="calc(100% - 56px)">
        <Box flex={1} p={2} sx={{ overflowY: 'scroll' }}>
          {children}
        </Box>
        <MoneygerBottomNavigation />
      </Box>
    </Box>
  );
};

export default MainTemplate;
