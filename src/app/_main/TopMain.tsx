'use client';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import getPriceColorAndBgColor from '@/logics/getPriceColorAndBgColor';
import { Box, Grid, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';

type Props = {
  summary: PaymentSummaryQuery;
};
const TopMain: React.FC<Props> = ({ summary }) => {
  const data = summary.paymentSummary;
  const { totalMaxAmount, totalCurrentAmount, totalPaymentRatio } = data;
  const diff = totalMaxAmount - totalCurrentAmount;
  const today = DateTime.now();
  const day = today.day;
  const ondOfMonth = today.endOf('month').day;
  const { color, bgColor } = getPriceColorAndBgColor(diff);
  return (
    <Box px={2}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" mb={1}>
          今月の残り（あと{ondOfMonth - day}日）
        </Typography>
        <Box p={0.5} bgcolor={bgColor} sx={{ borderRadius: 1 }}>
          <Typography color={color} variant="totalPrice">
            {diff.toLocaleString()}円
          </Typography>
        </Box>
      </Box>

      <Grid container rowSpacing={1.5}>
        <ItemBlock
          label="使える金額"
          body={`${totalMaxAmount.toLocaleString()}円`}
        />
        <ItemBlock
          label="支払った金額"
          body={`${totalCurrentAmount.toLocaleString()}円`}
        />
        <ItemBlock label="割合" body={`${totalPaymentRatio}%`} />
      </Grid>
    </Box>
  );
};

export default TopMain;

type ItemBlockProps = {
  label: string;
  body: string;
};
const ItemBlock: React.FC<ItemBlockProps> = ({ label, body }) => {
  return (
    <>
      <Grid item xs={6}>
        {label}
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography variant="body1Bold">{body}</Typography>
      </Grid>
    </>
  );
};
