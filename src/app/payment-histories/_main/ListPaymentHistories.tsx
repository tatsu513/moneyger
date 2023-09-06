'use client';
import { useMemo } from 'react';
import { Box, Divider, List, Typography } from '@mui/material';
import PaymentHistoryListItem from '@/app/payment-histories/_main/PaymentHistoryListItem';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import { grey } from '@/color';
import PrismaDateToFrontendDateStr from '@/logics/PrismaDateToFrontendDateStr';

type Props = {
  categoryId: number | null;
  initialState: PaymentHistory[];
};

const ListPaymentHistories: React.FC<Props> = ({ categoryId, initialState }) => {
  const listPaymentHistories = useMemo(() => {
    if (categoryId == null) return initialState;
    return initialState.flatMap((s) => (s.categoryId === categoryId ? [s] : []));
  }, [categoryId, initialState]);
  const listPaymentHistoriesPerDate = useMemo(() => {
    const map: Map<string, PaymentHistory[]> = new Map();
    listPaymentHistories.forEach((p) => {
      const date = p.paymentDate;
      const histories = listPaymentHistories.flatMap((p2) =>
        p2.paymentDate === date ? [p2] : [],
      );
      map.set(date, histories);
    });
    return map;
  }, [listPaymentHistories]);

  if (listPaymentHistories.length === 0) {
    return (
      <Typography variant="body1" color={grey[500]}>
        データがありません
      </Typography>
    );
  }
  return (
    <List>
      {[...listPaymentHistoriesPerDate].map(
        ([key, values]: [string, PaymentHistory[]]) => (
          <Box key={key}>
            <Box
              px={1}
              py={0.5}
              mb={1}
              bgcolor={grey[50]}
              sx={{ borderRadius: 1 }}
              textAlign="center"
            >
              <Typography variant="caption" mb={0.5}>
                {PrismaDateToFrontendDateStr(key)}
              </Typography>
            </Box>
            {values.map((v, i) => (
              <Box key={`${v.id}-${i}`}>
                <PaymentHistoryListItem
                  key={v.id}
                  id={v.id}
                  note={v.note ?? null}
                  price={v.price}
                  paymentDate={v.paymentDate}
                  labels={[]}
                />
                {values.length !== i + 1 && <Divider />}
              </Box>
            ))}
          </Box>
        ),
      )}
    </List>
  );
};

export default ListPaymentHistories;
