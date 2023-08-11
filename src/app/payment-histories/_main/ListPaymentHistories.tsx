'use client';
import { useMemo } from 'react';
import { List, Typography } from '@mui/material';
import PaymentHistoryListItem from '@/app/payment-histories/_main/PaymentHistoryListItem';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import { grey } from '@/color';

type Props = {
  paymentId: number | null;
  initialState: PaymentHistory[];
};

const ListPaymentHistories: React.FC<Props> = ({ paymentId, initialState }) => {
  const listPayments = useMemo(() => {
    if (paymentId == null) return initialState;
    return initialState.flatMap((s) => {
      return s.paymentId === paymentId ? s : [];
    });
  }, [paymentId, initialState]);
  if (listPayments.length === 0) {
    return <Typography variant='body1' color={grey[500]}>データがありません</Typography>;
  }
  return (
    <List>
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

export default ListPaymentHistories;
