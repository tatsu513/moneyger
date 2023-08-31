'use client';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
type Props = {
  title: string;
};
const ContentTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography
      variant='body1'
      bgcolor={grey[100]}
      p={1}
      pl={2}
      sx={{ borderRadius: 1 }}
    >
      {title}
    </Typography>
  )
};

export default ContentTitle;
