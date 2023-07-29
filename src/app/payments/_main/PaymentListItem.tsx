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
import getDisplayCalcPrice from '@/logics/getDisplayCalcPrice';
import { blue, grey, red } from '@/color';
import { useRouter } from 'next/navigation';

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
  const calcPrice = getDisplayCalcPrice(currentAmount, maxAmount);
  const calcPriceColor = (() => {
    if (calcPrice === 0) return grey[900];
    if (calcPrice < 0) return red[900];
    return blue[500];
  })();

  const handleClick = useCallback(() => {
    router.push(`/payments/[paymentId]`.replace('[paymentId]', id.toString()));
  }, [router, id]);
  return (
    <ListItem divider disablePadding>
      <ListItemButton
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        <Typography variant="body1">{name}</Typography>
        <Box textAlign="right">
          <Typography variant="h3Bold" color={calcPriceColor} mb={0.5}>
            {calcPrice.toLocaleString()}円
          </Typography>
          <Typography variant="body2">
            支払済:{currentAmount.toLocaleString()}円/ 上限:
            {getDisplayPrice(maxAmount)}円
          </Typography>
        </Box>
      </ListItemButton>
      <Divider />
    </ListItem>
  );
};

export default PaymentListItem;
