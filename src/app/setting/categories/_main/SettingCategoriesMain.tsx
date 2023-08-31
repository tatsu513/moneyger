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

type Props = {
  categories: SettingCategoriesPageQuery['listCategories'];
};
const SettingCategoriesMain: React.FC<Props> = ({ categories }) => {
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const { alertType, setSuccess, setError, setProcessing, setNone } =
    useAlert();

  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);

  return (
    <Box>
      <MoneygerSnackBar
        state={alertType}
        successMessage="費目の登録に成功しました"
        errorMessage="費目の登録に失敗しました"
        processingMessage="費目を登録中..."
        onClose={setNone}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
        <SecondaryButton label="費目を追加" size="small" startIcon={<AddIcon.default />} onClick={dialogOpen}/>
      </Box>

      {categories.length === 0 ? (
        <Typography variant="body1" color={grey[500]}>
          データが登録されていません
        </Typography>
      ) : (
        <List>
          {categories.map((p) => (
            <CategoriesListItem key={p.name} {...p} />
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
    </Box>
  );
};

export default SettingCategoriesMain;
