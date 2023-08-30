'use client';
import CategoriesSummary from '@/app/_main/CategoriesSummary';
import TotalSummary from '@/app/_main/TotalSummary';
import ContentTitle from '@/components/common/ContentTitle';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import { Box } from '@mui/material';
import React from 'react';

type Props = {
  summary: PaymentSummaryQuery;
};
const TopMain: React.FC<Props> = ({ summary }) => {
  return (
    <>
      <TotalSummary paymentSummary={summary.paymentSummary} />
      <Box my={4}>
        <ContentTitle title="費目" />
        <CategoriesSummary listCategories={summary.listCategories} />
      </Box>
    </>
  );
};

export default TopMain;

