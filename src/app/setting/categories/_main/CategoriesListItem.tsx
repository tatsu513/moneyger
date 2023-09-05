'use client';
import getDisplayPrice from 'src/logics/getDisplayPrice';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import * as CloseIcon from '@mui/icons-material/Close';
import { grey } from '@/color';
import { SettingCategoriesPageQuery } from '@/dao/generated/preset/graphql';

type Props = {
  id: number;
  name: string;
  maxAmount: number;
  labels: SettingCategoriesPageQuery['listCategoryLabels']
  onRowClick: (categoryId: number) => void;
  onDeleteClick: (categoryId: number) => void
};

const CategoriesListItem: React.FC<Props> = ({
  id,
  name,
  maxAmount,
  labels,
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
          display: "flex",
          flexDirection: "column"
        }}
        onClick={handleClick}
      >
        <Box display="flex" justifyContent='space-between' alignItems="center" width="100%" mb={0.5}>
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
        </Box>
        <Box textAlign="left" width="100%" display="flex" alignItems="center">
          <Typography variant='caption' flex={1}>ラベル：</Typography>
          <Stack direction="row" spacing={1} flex={5.5}>
            {labels.map((l) => (
              <Chip key={l.id.toString()} label={l.name} size="small" />
            ))}
          </Stack>
        </Box>
      </ListItemButton>
      <Divider />
    </ListItem>
  );
};

export default CategoriesListItem;
