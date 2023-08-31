'use client';
import {
  Box,
  Divider,
  ListItem,
  Typography,
} from '@mui/material';
import React from 'react';
import getPriceColorAndBgColor from '@/logics/getPriceColorAndBgColor';

type Props = {
  name: string;
  currentAmount: number;
  maxAmount: number;
};

const CategoriesListItem: React.FC<Props> = ({
  name,
  currentAmount,
  maxAmount,
}) => {
  const diff = maxAmount - currentAmount;
  const { color } = getPriceColorAndBgColor(diff);
  const sign = diff === 0 ? '' : diff > 0 ? '+' : '';

  return (
    <ListItem
      divider
      disablePadding
      sx={{
        px: 1,
        py: 1,
      }}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        width="100%"
      >
        <Typography variant="body1">{name}</Typography>
        <Box textAlign="right">
          <Typography variant="h3Bold" mb={0.5} color={color}>
            {sign + diff.toLocaleString()}円
          </Typography>
          <Typography variant="body2">
            支払済／{currentAmount.toLocaleString()}円
          </Typography>
        </Box>
      </Box>
      <Divider />
    </ListItem>
  );
};

export default CategoriesListItem;
