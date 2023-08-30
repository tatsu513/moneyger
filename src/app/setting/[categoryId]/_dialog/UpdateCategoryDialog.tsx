import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { Category } from '@/dao/generated/preset/graphql';
import { maxAmountType, nameType } from '@/models/category';
import DialogState from '@/types/DialogState';
import { Box, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const updateCategoryDialogUpdateCategoryDocument = graphql(`
  mutation createCategoryDialog_UpdateCategory(
    $id: Int!
    $name: String!
    $maxAmount: Int!
  ) {
    updateCategory(id: $id, name: $name, maxAmount: $maxAmount)
  }
`);

const updateSchema = z.object({
  id: z.number(),
  name: nameType,
  maxAmount: maxAmountType,
});

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
const UpdateCategoryDialog: React.FC<Props> = ({
  dialogState,
  category,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [maxAmount, setMaxAmount] = useState(category.maxAmount.toString());

  const safeParseResult = updateSchema.safeParse({
    id: category.id,
    name,
    maxAmount,
  });

  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handleChangeMaxAmount = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.target.value === '') setMaxAmount('');
      if (!maxAmountType.safeParse(e.target.value).success) {
        console.warn('入力値が不正です');
        return;
      }
      setMaxAmount(e.target.value);
    },
    [],
  );

  const handleClose = useCallback(() => {
    onClose();
    setName(category.name);
    setMaxAmount(category.maxAmount.toString());
  }, [category, onClose]);

  const submit = useMutation(updateCategoryDialogUpdateCategoryDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', { category });
      events.onError();
      return;
    }
    try {
      const result = await submit({
        id: safeParseResult.data.id,
        name: safeParseResult.data.name,
        maxAmount: safeParseResult.data.maxAmount,
      });
      if (result.error) {
        throw new Error('費目の更新に失敗しました');
      }
      events.onSuccess();
      router.refresh();
      handleClose();
    } catch (error) {
      console.error('費目の更新に失敗しました', { error });
      events.onError();
      return;
    }
  }, [safeParseResult, category, submit, handleClose, router, events]);

  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={handleClose}
      title="内容を編集"
      fullWidth
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <TextButton label="キャンセル" onClick={handleClose} />
          <PrimaryButton
            label="更新する"
            disabled={!safeParseResult.success}
            onClick={handleSubmit}
          />
        </Box>
      }
    >
      {category == null ? (
        <CommonLoading />
      ) : (
        <>
          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              名称
            </Typography>
            <TextField
              value={name}
              fullWidth
              onChange={handleChangeName}
              placeholder="食費"
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="body1" mb={1}>
              上限金額
            </Typography>
            <TextField
              value={maxAmount}
              fullWidth
              onChange={handleChangeMaxAmount}
              placeholder="10000"
              size="small"
            />
          </Box>
        </>
      )}
    </MoneygerDialog>
  );
};

export default UpdateCategoryDialog;
