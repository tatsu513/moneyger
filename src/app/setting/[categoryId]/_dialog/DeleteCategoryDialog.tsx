import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { Category } from '@/dao/generated/preset/graphql';
import DialogState from '@/types/DialogState';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';

const deleteCategoryDialogDeleteCategoryDocument = graphql(`
  mutation deleteCategoryDialog_DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`);

type Props = {
  dialogState: DialogState;
  category: Category;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const DeleteCategoryDialog: React.FC<Props> = ({
  dialogState,
  category,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const onCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);

  const submit = useMutation(deleteCategoryDialogDeleteCategoryDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!checked) return;
    try {
      const result = await submit({ id: category.id });
      if (result.error) {
        throw new Error('費目の削除に失敗しました');
      }
      events.onSuccess();
      router.push('/categories');
    } catch (error) {
      console.error('費目の削除に失敗しました', { error });
      events.onError();
      return;
    }
  }, [router, category.id, checked, submit, events]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="費目を削除"
      fullWidth
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <TextButton label="キャンセル" onClick={onClose} />
          <PrimaryButton
            label="更新する"
            disabled={!checked}
            onClick={handleSubmit}
          />
        </Box>
      }
    >
      {category == null ? (
        <CommonLoading />
      ) : (
        <Box>
          <Typography variant="body2" mb={2}>
            以下のカテゴリを削除します。
          </Typography>
          <Typography variant="body1" mb={0.5}>
            名称：{category.name}
          </Typography>
          <Typography variant="body1" mb={2}>
            上限：{category.maxAmount.toLocaleString()}円
          </Typography>
          <Typography variant="body1" mb={2}>
            支払済：{category.currentAmount.toLocaleString()}円
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={onCheck} />}
              label={
                <Typography variant="body2">
                  削除した内容は元に戻すことはできません。削除してよろしいですか？
                </Typography>
              }
            />
          </FormGroup>
        </Box>
      )}
    </MoneygerDialog>
  );
};

export default DeleteCategoryDialog;
