'use client';
import { Typography } from '@mui/material';
import React from 'react';
type Props = {
  title: string;
};
const PageTitle: React.FC<Props> = ({ title }) => {
  return <Typography variant="h1Bold">{title}</Typography>;
};

export default PageTitle;