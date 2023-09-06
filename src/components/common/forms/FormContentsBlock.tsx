import React from 'react';
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors';
import { Typography } from '@mui/material';

type Props = {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hasMargin?: boolean;
};
const FormContentsBlock: React.FC<Props> = ({
  label,
  children,
  required,
  hasMargin,
}) => {
  return (
    <Box mb={hasMargin ? 2 : 0}>
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="body2" mr={1}>
          {label}
        </Typography>
        {required && (
          <Box
            bgcolor={red[100]}
            px={1}
            display="flex"
            alignItems="center"
            sx={{ borderRadius: 1 }}
          >
            <Typography variant="caption" color={red[900]}>
              必須
            </Typography>
          </Box>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default FormContentsBlock;
