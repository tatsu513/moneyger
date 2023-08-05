'use client';
import { Divider, ListItem, ListItemButton, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PrismaDateToFrontendDateStr from '@/logics/PrismaDateToFrontendDateStr';

type Props = {
  id: number;
  paymentDate: string;
  note: string | null;
  price: number;
};

const PaymentHistoryListItem: React.FC<Props> = ({
  id,
  paymentDate,
  note,
  price,
}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(
      `/payment-histories/[paymentHistoryId]`.replace(
        '[paymentHistoryId]',
        id.toString(),
      ),
    );
  }, [router, id]);

  return (
    <ListItem divider disablePadding>
      <ListItemButton
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onClick={handleClick}
      >
        <Typography variant="caption" mb={1}>
          {PrismaDateToFrontendDateStr(paymentDate)}
        </Typography>
        <Typography variant="h3" mb={0.5}>
          {price.toLocaleString()}円
        </Typography>
        <Typography variant="body1">{note ?? '-'}</Typography>
      </ListItemButton>
      <Divider />
    </ListItem>
  );
};

export default PaymentHistoryListItem;
