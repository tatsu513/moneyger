'use client';

import { Typography } from '@mui/material';
import PaymentListItem from '@/app/payments/_main/PaymentListItem';
import { graphql } from '@/dao/generated/preset';
import { useMemo } from 'react';
import getUrqlVariables from '@/util/getUrqlVariables';
import { useQuery } from 'urql';

const paymentsMainDocument = graphql(`
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
  const urqlVariables = useMemo(() => {
    return getUrqlVariables(paymentsMainDocument, {}, true);
  }, []);
  const [{ data }] = useQuery(urqlVariables);
  console.log({ data });
  if (data == null) {
    console.info('収支項目を取得できませんでした');
    throw new Error('収支項目を取得できませんでした');
  }

  const listPayments = data?.listPayments ?? [];
  if (listPayments.length === 0) {
    return <Typography>データがありません</Typography>;
  }
  return (
    <>
      {data?.listPayments.map((p) => (
        <PaymentListItem
          key={p.name}
          title={p.name}
          currentPrice={p.currentAmount}
          limitPrice={p.maxAmount}
        />
      ))}
    </>
  );
};

export default ListPaymentWithSuspense;
