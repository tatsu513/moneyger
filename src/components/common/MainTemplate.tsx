'use client';
import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import MoneygerAppBar from '@/components/common/MoneygerAppBar';
import PageContentsTemplate from '@/components/common/PageContentsTemplate';
import MoneygerBottomNavigation from '@/components/common/MoneygerBottomNavigation';

const MainTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <MoneygerAppBar />
      <Box flex="auto" sx={{ overflowX: 'scroll' }}>
        <PageContentsTemplate>{children}</PageContentsTemplate>
      </Box>
      <MoneygerBottomNavigation />
    </Box>
  );
};

export default MainTemplate;
