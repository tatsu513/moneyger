'use client';
import { graphql } from '@/dao/generated/preset';
import { useMemo } from 'react';
import getUrqlVariables from '@/util/getUrqlVariables';
import { useQuery } from 'urql';
import { Typography } from '@mui/material';

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
  const [{ data, fetching, error }] = useQuery(val);

  if (fetching) {
    <>LOADING...</>;
  }
  if (error) {
    console.info('収支項目を取得できませんでした');
    throw new Error('収支項目を取得できませんでした');
  }

  const listPayments = data?.listPayments ?? [];
  if (listPayments.length === 0) {
    return <Typography>データがありません</Typography>;
  }
  return <Typography>大川達也です</Typography>;
};

export default ListPaymentWithSuspense;
