'use client';
import CategoriesSummary from '@/app/_main/CategoriesSummary';
import TotalSummary from '@/app/_main/TotalSummary';
import { grey } from '@/color';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  summary: PaymentSummaryQuery;
};
const TopMain: React.FC<Props> = ({ summary }) => {
  return (
    <>
      <TotalSummary paymentSummary={summary.paymentSummary} />
      <Box my={4}>
        <Typography variant='body1' bgcolor={grey[50]} p={0.5} textAlign="center" sx={{ borderRadius: 1 }}>費目</Typography>
        <CategoriesSummary listCategories={summary.listCategories} />
      </Box>
    </>
  );
};

export default TopMain;

