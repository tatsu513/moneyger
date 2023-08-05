'use client';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  summary: PaymentSummaryQuery;
};
const TopMain: React.FC<Props> = ({ summary }) => {
  const data = summary.paymentSummary;
  const { totalMaxAmount, totalCurrentAmount, totalPaymentRatio } = data;
  return (
    <Box>
      <Typography variant="h1" textAlign="center">
        {totalMaxAmount.toLocaleString()}
      </Typography>
      <Typography variant="h1" textAlign="center">
        {totalCurrentAmount.toLocaleString()}
      </Typography>
      <Typography variant="h1" textAlign="center">
        {totalPaymentRatio}
      </Typography>
    </Box>
  );
};

export default TopMain;
