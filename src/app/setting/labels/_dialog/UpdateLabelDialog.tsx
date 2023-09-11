import CategoryAutocomplete from '@/components/common/CategoryAutocomplete';
import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import FormContentsBlock from '@/components/common/forms/FormContentsBlock';
import { graphql } from '@/dao/generated/preset';
import { SettingLabelsPageQuery } from '@/dao/generated/preset/graphql';
import DialogState from '@/types/DialogState';
import { Box, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const updateLabelDialogUpdateCategoryLabelDocument = graphql(`
  mutation createLabelDialog_UpdateCategoryLabel(
    $categoryLabelId: Int!
    $name: String!
    $categoryId: Int
  ) {
    updateCategoryLabel(
      categoryLabelId: $categoryLabelId,
      name: $name,
      categoryId: $categoryId)
  }
`);

const updateSchema = z.object({
  categoryLabelId: z.number(),
  name: z.string(),
  categoryId: z.number().nullable()
});

type Label = SettingLabelsPageQuery['listCategoryLabels'][number];
type Category = SettingLabelsPageQuery['listCategories'][number];

type Props = {
  dialogState: DialogState;
  label: Label;
  categories: Category[];
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const UpdateLabelDialog: React.FC<Props> = ({
  dialogState,
  label,
  categories,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [name, setName] = useState(label.name);
  const [category, setCategory] = useState<Category | null>(null)

  const safeParseResult = updateSchema.safeParse({
    categoryLabelId: label.id,
    name,
    categoryId: category?.id ?? null
  });

  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handleChangeCategory = useCallback((value: Category | null) => {
    setCategory(value);
  }, [])

  const handleClose = useCallback(() => {
    onClose();
    setName(label.name);
  }, [label, onClose]);

  const submit = useMutation(updateLabelDialogUpdateCategoryLabelDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', { name });
      events.onError();
      return;
    }
    try {
      const result = await submit({
        categoryLabelId: safeParseResult.data.categoryLabelId,
        name: safeParseResult.data.name,
        categoryId: safeParseResult.data.categoryId
      });
      if (result.error) {
        throw new Error('費目の更新に失敗しました');
      }
      router.refresh();
      events.onSuccess();
      onClose();
      handleClose();
    } catch (error) {
      console.error('費目の更新に失敗しました', { error });
      events.onError();
      return;
    }
  }, [safeParseResult, name, submit, handleClose, router, events, onClose]);

  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={handleClose}
      title="ラベルを編集"
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
      {label == null ? (
        <CommonLoading />
      ) : (
        <>
          <FormContentsBlock label="名称" required hasMargin>
            <TextField
              value={name}
              fullWidth
              onChange={handleChangeName}
              placeholder="ラベル名を入力"
              size="small"
            />
          </FormContentsBlock>

          <FormContentsBlock label="費目ラベル" required hasMargin>
            <CategoryAutocomplete
              options={categories}
              selectedValue={category}
              onChange={handleChangeCategory}
            />
          </FormContentsBlock>
        </>
      )}
    </MoneygerDialog>
  );
};

export default UpdateLabelDialog;
