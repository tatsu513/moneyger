import { grey } from '@/color';
import PageTitle from '@/components/common/PageTitle';
import { graphql } from '@/dao/generated/preset';
import getUrqlVariables from '@/util/getUrqlVariables';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useQuery } from 'urql';
import { Delete as DeleteIcon } from '@mui/icons-material';

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
  paymentId: number;
  onClickDelete: () => void;
};
const PaymentWithSuspense: React.FC<Props> = ({ paymentId, onClickDelete }) => {
  const val = useMemo(() => {
    return getUrqlVariables(paymentWithSuspenseDocument, { paymentId }, true);
  }, [paymentId]);
  const [{ data }] = useQuery(val);
  const payment = data?.payment;
  if (payment == null) {
    console.info('収支項目を取得できませんでした');
    return <>取れません</>;
    //throw new Error('収支項目を取得できませんでした');
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <PageTitle title={payment.name} />
        <Box color={grey[500]}>
          <IconButton size="small" color="inherit" onClick={onClickDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
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
      </Box>

      <Box>
        <Typography variant="body1">支払済</Typography>
        <Typography variant="h2">
          {payment.currentAmount.toLocaleString()}円
        </Typography>
      </Box>
    </>
  );
};

export default PaymentWithSuspense;
