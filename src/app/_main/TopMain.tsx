'use client';
import CategoriesSummary from '@/app/_main/CategoriesSummary';
import TotalSummary from '@/app/_main/TotalSummary';
import ContentTitle from '@/components/common/ContentTitle';
import TextButton from '@/components/common/buttons/TextButton';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import { Box, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import React, { useCallback, useState } from 'react';
import * as ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const limitMonths = 3
const today = DateTime.now()

type Props = {
  summary: PaymentSummaryQuery;
};
const TopMain: React.FC<Props> = ({ summary }) => {
  // 取得する月の日付
  const [date, setDate] = useState<DateTime>(DateTime.now());
  const onclickPrevMonth = useCallback(() => {
    setDate((prev) => prev.minus({ months: 1 }))
  }, [])
  const onclickNextMonth = useCallback(() => {
    setDate((prev) => prev.plus({ months: 1 }))
  }, [])
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <TextButton
          label={`${date.minus({ months: 1 }).month}月`}
          startIcon={<ArrowBackIosIcon.default />}
          onClick={onclickPrevMonth}
          disabled={date.month === today.minus({ month: limitMonths }).month}
        />
        <Typography variant='h1Bold'>
          {date.month}月
        </Typography>
        <TextButton
          label={`${date.plus({ months: 1 }).month}月`}
          endIcon={<ArrowForwardIosIcon.default />}
          onClick={onclickNextMonth}
          disabled={date.month === today.month}
        />
      </Box>
      <TotalSummary paymentSummary={summary.paymentSummary} targetDate={date} />
      <Box my={4}>
        <ContentTitle title="費目" />
        <CategoriesSummary listCategories={summary.listCategories} targetDate={date} />
      </Box>
    </>
  );
};

export default TopMain;

