'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import DialogState from '@/types/DialogState';
import { SettingLabelsPageQuery } from '@/dao/generated/preset/graphql';
import { grey } from '@/color';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import * as AddIcon from '@mui/icons-material/Add';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
// import UpdateCategoryDialog from '@/app/setting/categories/_dialog/UpdateCategoryDialog';
// import DeleteCategoryDialog from '@/app/setting/categories/_dialog/DeleteCategoryDialog';
import LabelListItem from '@/app/setting/labels/_main/LabelListItem';
import CreateLabelDialog from '@/app/setting/labels/_dialog/CreateLabelDialog';
import DeleteLabelDialog from '@/app/setting/labels/_dialog/DeleteLabelDialog';
import UpdateLabelDialog from '@/app/setting/labels/_dialog/UpdateLabelDialog';

type Label = SettingLabelsPageQuery['listCategoryLabels'][number];
type Category = SettingLabelsPageQuery['listCategories'][number];
type Props = {
  labels: Label[];
  categories: Category[]
};
const SettingLabelsMain: React.FC<Props> = ({ labels, categories }) => {
  const [createDialogState, setCreateDialogState] =
    useState<DialogState>('closed');
  const [updateDialogState, setUpdateDialogState] =
    useState<DialogState>('closed');
  const [deleteDialogState, setDeleteDialogState] =
    useState<DialogState>('closed');
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);

  const listLabelsWithCategoryId = useMemo(() => {
    const sortedList = labels.sort((a, b) => {
      if (a.categoryId == null) return 1;
      if (b.categoryId == null) return -1;
      if (a.categoryId === b.categoryId) return 0;
      return a.categoryId < b.categoryId ? -1 : 1;
    })
    const map: Map<string, Label[]> = new Map();
    sortedList.forEach((l) => {
      const categoryId = l.categoryId;
      const histories = labels.flatMap((l2) =>
        l2.categoryId === categoryId ? [l2] : [],
      );
      const target = categories.find((c) => c.id === categoryId)
      map.set(target?.name ?? "", histories);
    });
    return map;
  }, [labels, categories]);

  const {
    alertType: createAlertType,
    setSuccess: setCreateSuccess,
    setError: setCreateError,
    setProcessing: setCreateProcessing,
    setNone: setCreateNone,
  } = useAlert();

  const {
    alertType: updateAlertType,
    setSuccess: setUpdateSuccess,
    setError: setUpdateError,
    setProcessing: setUpdateProcessing,
    setNone: setUpdateNone,
  } = useAlert();

  const {
    alertType: deleteAlertType,
    setSuccess: setDeleteSuccess,
    setError: setDeleteError,
    setProcessing: setDeleteProcessing,
    setNone: setDeleteNone,
  } = useAlert();

  const createDialogOpen = useCallback(() => setCreateDialogState('open'), []);
  const updateDialogOpen = useCallback(
    (id: number) => {
      setSelectedLabel(labels.find((c) => c.id === id) ?? null);
      setUpdateDialogState('open');
    },
    [labels],
  );
  const deleteDialogOpen = useCallback(
    (id: number) => {
      setSelectedLabel(labels.find((c) => c.id === id) ?? null);
      setDeleteDialogState('open');
    },
    [labels],
  );
  const dialogClose = useCallback(() => {
    setCreateDialogState('closed');
    setUpdateDialogState('closed');
    setDeleteDialogState('closed');
    setSelectedLabel(null);
  }, []);

  return (
    <Box>
      <MoneygerSnackBar
        state={createAlertType}
        successMessage="ラベルの登録に成功しました"
        errorMessage="ラベルの登録に失敗しました"
        processingMessage="ラベルを登録中..."
        onClose={setCreateNone}
      />
      <MoneygerSnackBar
        state={updateAlertType}
        successMessage="ラベルの更新に成功しました"
        errorMessage="ラベルの更新に失敗しました"
        processingMessage="ラベルを更新中..."
        onClose={setUpdateNone}
      />
      <MoneygerSnackBar
        state={deleteAlertType}
        successMessage="ラベルの削除に成功しました"
        errorMessage="ラベルの削除に失敗しました"
        processingMessage="ラベルを削除中..."
        onClose={setDeleteNone}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1.5}>
        <SecondaryButton
          label="ラベルを追加"
          size="small"
          startIcon={<AddIcon.default />}
          onClick={createDialogOpen}
        />
      </Box>

      {[...listLabelsWithCategoryId].map(([key, values]: [string, Label[]]) => (
          <>
            {values.length === 0
              ? <></>
              : (
                <List sx={{ p: 0 }}>
                  <ListItem divider disablePadding sx={{ backgroundColor: grey[50] }}>
                    <ListItemText sx={{ pl: 1.5, pr: 0, py: 0.5 }}>
                      <Typography variant="body1">{key || '未設定（全ての費目で表示）'}</Typography>
                    </ListItemText>
                  </ListItem>
                  {values.map((p) => (
                    <LabelListItem
                      key={p.name}
                      {...p}
                      onRowClick={updateDialogOpen}
                      onDeleteClick={deleteDialogOpen}
                    />
                  ))}
                </List>
              )
            }
          </>
      ))}

      <CreateLabelDialog
        dialogState={createDialogState}
        categories={categories}
        onClose={dialogClose}
        events={{
          onSuccess: setCreateSuccess,
          onError: setCreateError,
          onProcessing: setCreateProcessing,
        }}
      />
      {selectedLabel && (
        <>
          <UpdateLabelDialog
            dialogState={updateDialogState}
            label={selectedLabel}
            categories={categories}
            onClose={dialogClose}
            events={{
              onSuccess: setUpdateSuccess,
              onError: setUpdateError,
              onProcessing: setUpdateProcessing,
            }}
          />
          <DeleteLabelDialog
            dialogState={deleteDialogState}
            label={selectedLabel}
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

export default SettingLabelsMain;
