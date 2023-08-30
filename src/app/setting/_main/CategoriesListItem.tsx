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

type Props = {
  id: number;
  name: string;
  maxAmount: number;
};

const CategoriesListItem: React.FC<Props> = ({
  id,
  name,
  maxAmount,
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(
      `/categories/[categoryId]`.replace('[categoryId]', id.toString()),
    );
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
          <Typography variant="body1" mb={0.5}>
            {getDisplayPrice(maxAmount)}円
          </Typography>
        </Box>
      </ListItemButton>
      <Divider />
    </ListItem>
  );
};

export default CategoriesListItem;
