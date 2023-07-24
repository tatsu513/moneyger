import { graphql } from '@/dao/generated/preset';
import React from 'react';

const paymentAndPriceWithSuspenseDocument = graphql(`
  query paymentAndPriceWithSuspense($paymentId: Int!) {
    payment(paymentId: $paymentId) {
      id
      name
    }
  }
`);

type Props = {
  paymentId: number;
};
const PaymentAndPriceWithSuspense: React.FC<Props> = ({ paymentId }) => {
  return <div>PaymentAndPriceWithSuspense</div>;
};

export default PaymentAndPriceWithSuspense;
