import getDisplayPrice from 'src/logics/getDisplayPrice';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import DisplayCalcPrice from '@/components/common/DisplayCalcPrice';

type Props = {
  title: string;
  currentPrice: number;
  limitPrice: number;
};

const PaymentListItem: React.FC<Props> = ({ title, currentPrice, limitPrice }) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
        <Typography variant="body1">{title}</Typography>
        <Box textAlign="right">
          <Typography variant="body1">{getDisplayPrice(currentPrice)}</Typography>
          <DisplayCalcPrice currentPrice={currentPrice} limitPrice={limitPrice} />
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default PaymentListItem;
