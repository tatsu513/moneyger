import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

const MainContentsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box px={2}>{children}</Box>;
};

export default MainContentsWrapper;
