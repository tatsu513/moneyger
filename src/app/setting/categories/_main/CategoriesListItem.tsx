'use client';
import getDisplayPrice from 'src/logics/getDisplayPrice';
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import * as CloseIcon from '@mui/icons-material/Close';
import { grey } from '@/color';

type Props = {
  id: number;
  name: string;
  maxAmount: number;
  onRowClick: (categoryId: number) => void;
  onDeleteClick: (categoryId: number) => void
};

const CategoriesListItem: React.FC<Props> = ({
  id,
  name,
  maxAmount,
  onRowClick,
  onDeleteClick,
}) => {
  const handleClick = useCallback(() => {
    onRowClick(id);
  }, [onRowClick, id]);

  const handleDeleteClick  = useCallback((e: React.MouseEvent<HTMLElement>) => {
    onDeleteClick(id);
    e.stopPropagation();
    e.preventDefault();
  }, [onDeleteClick, id]);
  return (
    <ListItem divider disablePadding>
      <ListItemButton
        sx={{
          pl: 1,
          pr: 0,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={handleClick}
      >
        <Typography variant="body1">{name}</Typography>
        <Box display="flex" alignItems="center">
          <Box textAlign="right">
            <Typography variant="body1" mb={0.5}>
              {getDisplayPrice(maxAmount)}円
            </Typography>
          </Box>
          <Box color={grey[400]}>
            <Box>
              <IconButton color="inherit" onClick={handleDeleteClick} size='small'>
                <CloseIcon.default fontSize='inherit'/>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </ListItemButton>
      <Divider />
    </ListItem>
  );
};

export default CategoriesListItem;
