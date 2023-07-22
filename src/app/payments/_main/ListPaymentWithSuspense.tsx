'use client';
import PaymentListItem from '@/app/payments/_main/PaymentListItem';
import { graphql } from '@/dao/generated/preset';
import { useMemo } from 'react';
import getUrqlVariables from '@/util/getUrqlVariables';
import { useQuery } from 'urql';
import { Divider, List, Typography } from '@mui/material';

const listPaymentWithSuspenseDocument = graphql(`
  query listPayments {
    listPayments {
      id
      name
      maxAmount
      currentAmount
    }
  }
`);

const ListPaymentWithSuspense: React.FC = () => {
  const val = useMemo(() => {
    return getUrqlVariables(listPaymentWithSuspenseDocument, {}, true);
  }, []);
  const [{ data }] = useQuery(val);

  if (data == null) {
    console.info('収支項目を取得できませんでした');
    throw new Error('収支項目を取得できませんでした');
  }

  const listPayments = data?.listPayments ?? [];
  if (listPayments.length === 0) {
    return <Typography>データがありません</Typography>;
  }
  return (
    <List>
      <Divider component="li" />
      {data?.listPayments.map((p) => (
        <PaymentListItem
          key={p.name}
          id={p.id}
          name={p.name}
          currentAmount={p.currentAmount}
          maxAmount={p.maxAmount}
        />
      ))}
    </List>
  );
};

export default ListPaymentWithSuspense;
