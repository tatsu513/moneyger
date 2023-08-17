'use client';
import { ListItem, ListItemButton, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  id: number;
  note: string | null;
  price: number;
};

const PaymentHistoryListItem: React.FC<Props> = ({
  id,
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
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          px: 0,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onClick={handleClick}
      >
        <Typography variant="h3Bold" mb={0.5}>
          {price.toLocaleString()}円
        </Typography>
        <Typography variant="body1">{!note ? '-' : note}</Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default PaymentHistoryListItem;
