'use client';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import React from 'react';
import getPriceColorAndBgColor from '@/logics/getPriceColorAndBgColor';
import { grey } from '@/color';

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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box>
          <Typography variant="body1" mb={0.5}>
            {name}
          </Typography>
          <Typography variant="body2" mb={0.5} color={grey[500]}>
            上限
          </Typography>
          <Typography variant="body2" color={grey[500]}>
            支払済み
          </Typography>
        </Box>

        <Box textAlign="right">
          <Typography variant="h3Bold" mb={0.5} color={color}>
            {diff.toLocaleString()}円
          </Typography>
          <Typography variant="body2" mb={0.5} color={grey[500]}>
            {maxAmount.toLocaleString()}円
          </Typography>
          <Typography variant="body2" color={grey[500]}>
            {currentAmount.toLocaleString()}円
          </Typography>
        </Box>
      </Box>
      <Divider />
    </ListItem>
  );
};

export default CategoriesListItem;
