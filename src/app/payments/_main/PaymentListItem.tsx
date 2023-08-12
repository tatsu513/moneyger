'use client';
import getDisplayPrice from 'src/logics/getDisplayPrice';
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import getPriceColorAndBgColor from '@/logics/getPriceColorAndBgColor';

type Props = {
  id: number;
  name: string;
  currentAmount: number;
  maxAmount: number;
};

const PaymentListItem: React.FC<Props> = ({
  id,
  name,
  currentAmount,
  maxAmount,
}) => {
  const router = useRouter();
  const diff = maxAmount - currentAmount;
  const { color } = getPriceColorAndBgColor(diff);
  const sign = diff === 0 ? '' : diff > 0 ? '+' : '-';

  const handleClick = useCallback(() => {
    router.push(`/payments/[paymentId]`.replace('[paymentId]', id.toString()));
  }, [router, id]);
  return (
    <ListItem divider disablePadding>
      <ListItemButton
        sx={{
          px: 1,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        <Typography variant="body1">{name}</Typography>
        <Box textAlign="right">
          <Typography variant="h3Bold" mb={0.5} color={color}>
            {sign + diff.toLocaleString()}円
          </Typography>
          <Typography variant="body2">
          上限:
            {getDisplayPrice(maxAmount)}円／支払済:{currentAmount.toLocaleString()}円
          </Typography>
        </Box>
      </ListItemButton>
      <Divider />
    </ListItem>
  );
};

export default PaymentListItem;
