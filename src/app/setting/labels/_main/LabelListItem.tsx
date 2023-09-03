'use client';
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
  onRowClick: (categoryId: number) => void;
  onDeleteClick: (categoryId: number) => void
};

const LabelListItem: React.FC<Props> = ({
  id,
  name,
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
        <Box color={grey[400]}>
          <Box>
            <IconButton color="inherit" onClick={handleDeleteClick} size='small'>
              <CloseIcon.default fontSize='inherit'/>
            </IconButton>
          </Box>
        </Box>
      </ListItemButton>
      <Divider />
    </ListItem>
  );
};

export default LabelListItem;
