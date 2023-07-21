import { grey } from '@/color';
import { graphql } from '@/dao/generated/preset';
import getUrqlVariables from '@/util/getUrqlVariables';
import { Box, Button, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useQuery } from 'urql';

const paymentWithSuspenseDocument = graphql(`
  query payment($paymentId: Int!) {
    payment(paymentId: $paymentId) {
      id
      name
      maxAmount
      currentAmount
    }
  }
`);

type Props = {
  id: number;
};
const PaymentWithSuspense: React.FC<Props> = ({ id }) => {
  const val = useMemo(() => {
    return getUrqlVariables(
      paymentWithSuspenseDocument,
      { paymentId: id },
      true,
    );
  }, [id]);
  const [{ data }] = useQuery(val);
  const payment = data?.payment;
  if (payment == null) {
    console.info('収支項目を取得できませんでした');
    throw new Error('収支項目を取得できませんでした');
  }
  return (
    <>
      <Box mb={2}>
        <Typography variant="body1" mb={0.5}>
          今月の使用可能金額
        </Typography>
        <Typography variant="h1">
          {(payment.maxAmount - payment.currentAmount).toLocaleString()}円
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="body1">上限</Typography>
        <Typography variant="h2">
          {payment.maxAmount.toLocaleString()}円
        </Typography>
        {/* <TextField value={value} fullWidth onChange={onChange} /> */}
      </Box>

      <Box>
        <Typography variant="body1">支払済金額</Typography>
        <Typography variant="h2">
          {payment.currentAmount.toLocaleString()}円
        </Typography>
        {/* <TextField value={value} fullWidth onChange={onChange} /> */}
      </Box>

      <Button variant="contained" fullWidth>
        変更を保存
      </Button>
      <Button variant="text" sx={{ color: grey[900] }}>
        削除する
      </Button>
    </>
  );
};

export default PaymentWithSuspense;
