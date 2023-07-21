'use client';

import React, { useMemo } from 'react';
import { useQuery } from '@urql/next';
import { graphql } from '@/dao/generated/preset';
import getUrqlVariables from '@/util/getUrqlVariables';

type Book = {
  id: number;
  name: string;
  maxAmount: number;
  currentAmount: number;
};

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

const PaymentsMain = () => {
  const val = useMemo(() => {
    return getUrqlVariables(paymentsMainDocument, {}, true);
  }, []);
  const [result] = useQuery(val);
  const { data } = result;

  if (data == null) {
    return <>nullだよ</>;
  }

  return (
    <ul>
      {data?.listPayments.map((b: Book) => (
        <li key={b.id}>
          {b.name}／{b.currentAmount}
        </li>
      ))}
    </ul>
  );
  // return (
  //   <Box>
  //     <Typography variant="h3">LIST</Typography>
  //     <Divider />
  //     <FetchErrorBoundary>
  //       <Suspense fallback={<CommonLoading />}>
  //         <ListPaymentWithSuspense />
  //       </Suspense>
  //     </FetchErrorBoundary>
  //   </Box>
  // )
};

export default PaymentsMain;
