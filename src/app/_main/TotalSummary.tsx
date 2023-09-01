'use client';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import getPriceColorAndBgColor from '@/logics/getPriceColorAndBgColor';
import { Box, Grid, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { graphql } from '@/dao/generated/preset/gql';
import getUrqlVariables from '@/util/getUrqlVariables';
import dateTimeToStringDate from '@/logics/dateTimeToStringDate';
import { useQuery } from 'urql';

const topPageMainDocument = graphql(`
  query paymentSummaryMain($targetDate: String!) {
    paymentSummary(targetDate: $targetDate) {
      totalMaxAmount
      totalCurrentAmount
      totalPaymentRatio
    }
  }
`);

type Props = {
  paymentSummary: PaymentSummaryQuery['paymentSummary'];
  targetDate: DateTime
};
const TotalSummary: React.FC<Props> = ({ paymentSummary, targetDate }) => {  
  const val = useMemo(() => {
    return getUrqlVariables(
      topPageMainDocument,
      { targetDate: dateTimeToStringDate(targetDate) },
      false,
    )
  }, [targetDate])
  const [{ data }] = useQuery(val);
  const summary = useMemo(() => {
    return data == null ? paymentSummary : data.paymentSummary
  }, [data, paymentSummary])

  const { totalMaxAmount, totalCurrentAmount, totalPaymentRatio } = summary;
  const diff = totalMaxAmount - totalCurrentAmount;
  const today = DateTime.now();
  const day = today.day;
  const ondOfMonth = today.endOf('month').day;
  const { color, bgColor } = getPriceColorAndBgColor(diff);

  return (
    <>
      <Box mb={3}>
        <Typography variant="body1" mb={1} textAlign="left">
          今月の余力（あと{ondOfMonth - day}日）
        </Typography>
        <Box p={0.5} bgcolor={bgColor} textAlign="center" sx={{ borderRadius: 1 }}>
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
    </>
  );
};

export default TotalSummary;

type ItemBlockProps = {
  label: string;
  body: string;
};
const ItemBlock: React.FC<ItemBlockProps> = ({ label, body }) => {
  return (
    <>
      <Grid item xs={6}>
      <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography variant="body1Bold">{body}</Typography>
      </Grid>
    </>
  );
};
