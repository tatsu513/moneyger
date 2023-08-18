'use client';
import { useMemo } from 'react';
import { Box, Divider, List, Typography } from '@mui/material';
import PaymentHistoryListItem from '@/app/payment-histories/_main/PaymentHistoryListItem';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import { grey } from '@/color';
import PrismaDateToFrontendDateStr from '@/logics/PrismaDateToFrontendDateStr';

type Props = {
  paymentId: number | null;
  initialState: PaymentHistory[];
};

const ListPaymentHistories: React.FC<Props> = ({ paymentId, initialState }) => {
  const listPayments = useMemo(() => {
    if (paymentId == null) return initialState;
    return initialState.flatMap((s) => s.paymentId === paymentId ? [s] : []);
  }, [paymentId, initialState]);
  const listPaymentsPerDate = useMemo(() => {
    const map: Map<string, PaymentHistory[]> = new Map();
    listPayments.forEach((p) => {
      const date = p.paymentDate;
      const histories = listPayments.flatMap((p2) => p2.paymentDate === date ? [p2] : [])
      map.set(date, histories)
    })
    return map
  }, [listPayments])

  if (listPayments.length === 0) {
    return <Typography variant='body1' color={grey[500]}>データがありません</Typography>;
  }
  return (
    <List>
      {[...listPaymentsPerDate].map(([key, values]: [string, PaymentHistory[]]) => (
        <Box key={key}>
          <Box px={1} py={0.5} mb={1} bgcolor={grey[50]} sx={{ borderRadius: 1}} textAlign="center">
            <Typography variant='caption' mb={0.5}>{PrismaDateToFrontendDateStr(key)}</Typography>
          </Box>
          {values.map((v, i) => (
            <Box key={`${v.id}-${i}`}>
              <PaymentHistoryListItem
                key={v.id}
                id={v.id}
                note={v.note ?? null}
                price={v.price}
              />
              {values.length !== i + 1 && <Divider />}
            </Box>
          ))}
        </Box>
      ))}
    </List>
  );
};

export default ListPaymentHistories;
