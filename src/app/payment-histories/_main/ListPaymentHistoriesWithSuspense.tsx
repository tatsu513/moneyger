'use client';
import { graphql } from '@/dao/generated/preset';
import { useMemo } from 'react';
import getUrqlVariables from '@/util/getUrqlVariables';
import { useQuery } from 'urql';
import { Divider, List, Typography } from '@mui/material';
import PaymentHistoryListItem from '@/app/payment-histories/_main/PaymentHistoryListItem';

const listPaymentHistoriesWithSuspenseDocument = graphql(`
  query listPaymentHistories($paymentId: Int!) {
    listPaymentHistoriesByPaymentId(paymentId: $paymentId) {
      id
      paymentId
      paymentDate
      note
      price
    }
  }
`);

type Props = {
  paymentId: number;
};

const ListPaymentHistoriesWithSuspense: React.FC<Props> = ({ paymentId }) => {
  const val = useMemo(() => {
    return getUrqlVariables(
      listPaymentHistoriesWithSuspenseDocument,
      { paymentId },
      true,
    );
  }, [paymentId]);
  const [{ data }] = useQuery(val);

  if (data == null) {
    console.info('paymentに紐づく支払履歴一覧を取得できませんでした');
    // throw new Error('を取得できませんでした');
  }

  const listPayments = data?.listPaymentHistoriesByPaymentId ?? [];
  if (listPayments.length === 0) {
    return <Typography>データがありません</Typography>;
  }
  return (
    <List>
      <Divider component="li" />
      {listPayments.map((p) => (
        <PaymentHistoryListItem
          key={p.id}
          id={p.id}
          paymentDate={p.paymentDate}
          note={p.note ?? null}
          price={p.price}
        />
      ))}
    </List>
  );
};

export default ListPaymentHistoriesWithSuspense;
