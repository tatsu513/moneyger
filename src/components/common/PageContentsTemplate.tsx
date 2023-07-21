import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

const PageContentsTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box pt={2}>{children}</Box>;
};

export default PageContentsTemplate;
