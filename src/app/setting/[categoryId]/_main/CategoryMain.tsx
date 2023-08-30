'use client';
import React, { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import UpdateCategoryDialog from '@/app/setting/[categoryId]/_dialog/UpdateCategoryDialog';
import DialogState from '@/types/DialogState';
import DeleteCategoryDialog from '@/app/setting/[categoryId]/_dialog/DeleteCategoryDialog';
import { Category } from '@/dao/generated/preset/graphql';
import PageTitle from '@/components/common/PageTitle';
import { grey } from '@/color';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import RowContentsBlock from '@/components/common/RowContentsBlock';
import Link from 'next/link';
import * as ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextButton from '@/components/common/buttons/TextButton';

type Props = {
  category: Category;
};

const CategoryMain: React.FC<Props> = ({ category }) => {
  const [updateDialogState, setUpdateDialogState] =
    useState<DialogState>('closed');
  const [deleteDialogState, setDeleteDialogState] =
    useState<DialogState>(`closed`);

  const noop = useCallback(() => {}, []);

  const {
    alertType: updateAlertType,
    setSuccess: updateSetSuccess,
    setError: updateSetError,
    setProcessing: updateSetProcessing,
    setNone: updateSetNone,
  } = useAlert();
  const {
    alertType: deleteAlertType,
    setSuccess: deleteSetSuccess,
    setError: deleteSetError,
    setProcessing: deleteSetProcessing,
    setNone: deleteSetNone,
  } = useAlert();

  const updateDialogOpen = useCallback(() => {
    setUpdateDialogState('open');
  }, []);
  const deleteDialogOpen = useCallback(() => {
    setDeleteDialogState('open');
  }, []);
  const handleClose = useCallback(() => {
    setUpdateDialogState('closed');
    setDeleteDialogState('closed');
  }, []);
  return (
    <>
      <MoneygerSnackBar
        state={updateAlertType}
        successMessage="費目の更新に成功しました"
        errorMessage="費目の更新に失敗しました"
        processingMessage="費目を更新中..."
        onClose={updateSetNone}
      />
      <MoneygerSnackBar
        state={deleteAlertType}
        successMessage="費目の削除に成功しました"
        errorMessage="費目の削除に失敗しました"
        processingMessage="費目を削除中..."
        onClose={deleteSetNone}
      />
      <Box mb={4}>
        <Box mb={2}>
          <Link
            href="/categories"
            style={{ textDecoration: 'none', color: grey[900] }}
          >
            <TextButton
              label="一覧へ"
              startIcon={<ArrowBackIosIcon.default />}
              onClick={noop}
            />
          </Link>
        </Box>
        <Box mb={2}>
          <Typography variant="body2" mb={0.5} color={grey[500]}>
            費目
          </Typography>
          <PageTitle title={category.name} />
        </Box>

        <RowContentsBlock
          title="残り"
          body={
            (category.maxAmount - category.currentAmount).toLocaleString() +
            '円'
          }
        />
        <RowContentsBlock
          title="上限"
          body={category.maxAmount.toLocaleString() + '円'}
        />
        <RowContentsBlock
          title="支払済"
          body={category.currentAmount.toLocaleString() + '円'}
        />

        <Box textAlign="center" display="flex" columnGap={1} mt={4}>
          <Box flex={1}>
            <PrimaryButton label="編集" fullWidth onClick={updateDialogOpen} />
          </Box>
          <Box flex={1}>
            <SecondaryButton
              label="削除"
              fullWidth
              onClick={deleteDialogOpen}
            />
          </Box>
        </Box>
      </Box>

      <UpdateCategoryDialog
        dialogState={updateDialogState}
        category={category}
        onClose={handleClose}
        events={{
          onSuccess: updateSetSuccess,
          onError: updateSetError,
          onProcessing: updateSetProcessing,
        }}
      />
      <DeleteCategoryDialog
        dialogState={deleteDialogState}
        category={category}
        onClose={handleClose}
        events={{
          onSuccess: deleteSetSuccess,
          onError: deleteSetError,
          onProcessing: deleteSetProcessing,
        }}
      />
    </>
  );
};

export default CategoryMain;
