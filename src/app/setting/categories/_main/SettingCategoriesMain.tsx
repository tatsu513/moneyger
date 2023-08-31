'use client';

import React, { useCallback, useState } from 'react';
import { Box, List, Typography } from '@mui/material';
import DialogState from '@/types/DialogState';
import CreateCategoryDialog from '@/app/setting/_dialog/CreateCategoryDialog';
import { SettingCategoriesPageQuery } from '@/dao/generated/preset/graphql';
import CategoriesListItem from '@/app/setting/categories/_main/CategoriesListItem';
import { grey } from '@/color';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import * as AddIcon from '@mui/icons-material/Add';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
import UpdateCategoryDialog from '@/app/setting/categories/_dialog/UpdateCategoryDialog';
import DeleteCategoryDialog from '@/app/setting/categories/_dialog/DeleteCategoryDialog';

type Category = SettingCategoriesPageQuery['listCategories'][number]
type Props = {
  categories: Category[];
};
const SettingCategoriesMain: React.FC<Props> = ({ categories }) => {
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const [updateDialogState, setUpdateDialogState] = useState<DialogState>('closed');
  const [deleteDialogState, setDeleteDialogState] = useState<DialogState>('closed');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const { alertType, setSuccess, setError, setProcessing, setNone } =
    useAlert();

  const {
    alertType: updateAlertType,
    setSuccess: setUpdateSuccess,
    setError: setUpdateError,
    setProcessing: setUpdateProcessing,
    setNone: setUpdateNone
  } = useAlert();

  const {
    alertType: deleteAlertType,
    setSuccess: setDeleteSuccess,
    setError: setDeleteError,
    setProcessing: setDeleteProcessing,
    setNone: setDeleteNone
  } = useAlert();

  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const updateDialogOpen = useCallback((id: number) => {
    setSelectedCategory(
      categories.find((c) => c.id === id) ?? null
    )
    setUpdateDialogState('open')
  }, [categories]);
  const deleteDialogOpen = useCallback((id: number) => {
    setSelectedCategory(
      categories.find((c) => c.id === id) ?? null
    )
    setDeleteDialogState('open')
  }, [categories]);
  const dialogClose = useCallback(() => {
    setDialogState('closed');
    setUpdateDialogState('closed')
    setDeleteDialogState('closed')
    setSelectedCategory(null)
  }, []);

  return (
    <Box>
      <MoneygerSnackBar
        state={alertType}
        successMessage="費目の登録に成功しました"
        errorMessage="費目の登録に失敗しました"
        processingMessage="費目を登録中..."
        onClose={setNone}
      />
      <MoneygerSnackBar
        state={updateAlertType}
        successMessage="費目の更新に成功しました"
        errorMessage="費目の更新に失敗しました"
        processingMessage="費目を更新中..."
        onClose={setUpdateNone}
      />
      <MoneygerSnackBar
        state={deleteAlertType}
        successMessage="費目の削除に成功しました"
        errorMessage="費目の削除に失敗しました"
        processingMessage="費目を削除中..."
        onClose={setDeleteNone}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <SecondaryButton label="費目を追加" size="small" startIcon={<AddIcon.default />} onClick={dialogOpen}/>
      </Box>

      {categories.length === 0 ? (
        <Typography variant="body1" color={grey[500]}>
          データが登録されていません
        </Typography>
      ) : (
        <List>
          {categories.map((p) => (
            <CategoriesListItem
              key={p.name} {...p}
              onRowClick={updateDialogOpen}
              onDeleteClick={deleteDialogOpen}
            />
          ))}
        </List>
      )}
      <CreateCategoryDialog
        dialogState={dialogState}
        onClose={dialogClose}
        events={{
          onSuccess: setSuccess,
          onError: setError,
          onProcessing: setProcessing,
        }}
      />
      {selectedCategory && (
        <>
          <UpdateCategoryDialog
          dialogState={updateDialogState}
          category={selectedCategory}
          onClose={dialogClose}
          events={{
            onSuccess: setUpdateSuccess,
            onError: setUpdateError,
            onProcessing: setUpdateProcessing,
          }}
        />
        <DeleteCategoryDialog
          dialogState={deleteDialogState}
          category={selectedCategory}
          onClose={dialogClose}
          events={{
            onSuccess: setDeleteSuccess,
            onError: setDeleteError,
            onProcessing: setDeleteProcessing,
          }}
        />
      </>
      )}
    </Box>
  );
};

export default SettingCategoriesMain;
