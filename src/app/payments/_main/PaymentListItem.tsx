import getDisplayPrice from 'src/logics/getDisplayPrice';
import { Box, Divider, ListItemButton, Typography } from '@mui/material';
import React from 'react';
import getDisplayCalcPrice from '@/logics/getDisplayCalcPrice';
import { blue, grey, red } from '@/color';

type Props = {
  name: string;
  currentAmount: number;
  maxAmount: number;
};

const PaymentListItem: React.FC<Props> = ({
  name,
  currentAmount,
  maxAmount,
}) => {
  const calcPrice = getDisplayCalcPrice(currentAmount, maxAmount);
  const calcPriceColor = (() => {
    if (calcPrice === 0) return grey[900];
    if (calcPrice < 0) return red[900];
    return blue[900];
  })();
  return (
    <>
      <ListItemButton
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1">{name}</Typography>
        <Box textAlign="right">
          <Typography variant="h3Bold" color={calcPriceColor} mb={0.5}>
            -{(maxAmount - calcPrice).toLocaleString()}円
          </Typography>
          <Typography variant="body2">
            支払済:{calcPrice.toLocaleString()}円/ 上限:
            {getDisplayPrice(maxAmount)}円
          </Typography>
        </Box>
      </ListItemButton>
      <Divider />
    </>
  );
};

export default PaymentListItem;
