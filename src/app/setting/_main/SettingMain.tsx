'use client';

import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import AddCategoryDialog from '@/app/setting/_dialog/AddCategoryDialog';
import DialogState from '@/types/DialogState';
import {
  MoreHoriz as MoreHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material/';
import { red } from '@mui/material/colors';
import UpdateCategoryDialog from '@/app/setting/_dialog/UpdateCategoryDialog';
import DeleteCategoryDialog from '@/app/setting/_dialog/DeleteCategoryDialog';

const SettingMain = () => {
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const [updateDialogState, setUpdateDialogState] =
    useState<DialogState>('closed');
  const [deleteDialogState, setDeleteDialogState] =
    useState<DialogState>('closed');

  const openDialog = useCallback(() => {
    setDialogState('open');
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState('closed');
    setUpdateDialogState('closed');
    setDeleteDialogState('closed');
  }, []);

  const openUpdateDialog = useCallback(() => {
    setUpdateDialogState('open');
  }, []);

  const DeleteUpdateDialog = useCallback(() => {
    setDeleteDialogState('open');
  }, []);

  return (
    <Box>
      <List sx={{ mb: 2 }}>
        {accounts.map((v) => (
          <ListItem
            key={v.title}
            sx={{ flexDirection: 'column' }}
            secondaryAction={
              <MoreHorizMenu
                onClickUpdate={openUpdateDialog}
                onClickDelete={DeleteUpdateDialog}
              />
            }
            alignItems="flex-start"
            divider
          >
            <Typography variant="h4" mb={1}>
              {v.title}
            </Typography>
            <Typography variant="body1" mb={0.5}>
              上限：{v.limitPrice.toLocaleString()}円
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box>
        <Button fullWidth onClick={openDialog}>
          カテゴリを追加
        </Button>
      </Box>
      <AddCategoryDialog dialogState={dialogState} onClose={closeDialog} />
      <UpdateCategoryDialog
        dialogState={updateDialogState}
        onClose={closeDialog}
      />
      <DeleteCategoryDialog
        dialogState={deleteDialogState}
        onClose={closeDialog}
      />
    </Box>
  );
};

export default SettingMain;

type MoreHorizMenuProps = {
  onClickUpdate: () => void;
  onClickDelete: () => void;
};
const MoreHorizMenu: React.FC<MoreHorizMenuProps> = ({
  onClickUpdate,
  onClickDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    [],
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const openUpdateDialog = useCallback(() => {
    onClickUpdate();
    handleClose();
  }, [onClickUpdate, handleClose]);

  const openDeleteDialog = useCallback(() => {
    onClickDelete();
    handleClose();
  }, [onClickDelete, handleClose]);
  return (
    <>
      <IconButton edge="end" aria-label="3点リーダー" onClick={handleMenu}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={openUpdateDialog}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">編集</Typography>
        </MenuItem>
        <MenuItem onClick={openDeleteDialog}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: red[500] }} />
          </ListItemIcon>
          <Typography variant="body2" color={red[500]}>
            削除
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const accounts = [
  {
    id: '1',
    title: '食費',
    limitPrice: 0,
  },
  {
    id: '2',
    title: 'いつ栞',
    limitPrice: 30000,
  },
];
