import CommonLoading from '@/components/common/CommonLoading';
import MoneygerAutocompleteMultiple from '@/components/common/MoneygerAutocompleteMultiple';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { SettingCategoriesPageQuery } from '@/dao/generated/preset/graphql';
import { labelsType, maxAmountType, nameType } from '@/models/category';
import DialogState from '@/types/DialogState';
import { Box, TextField, Typography, createFilterOptions } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const updateCategoryDialogUpdateCategoryDocument = graphql(`
  mutation updateCategoryDialog_UpdateCategory(
    $id: Int!
    $name: String!
    $maxAmount: Int!
    $labelIds: [Int!]!
  ) {
    updateCategory(id: $id, name: $name, maxAmount: $maxAmount, labelIds: $labelIds)
  }
`);

const updateSchema = z.object({
  id: z.number(),
  name: nameType,
  maxAmount: maxAmountType,
  labels: labelsType
});

type Category = SettingCategoriesPageQuery['listCategories'][number]
type Label = SettingCategoriesPageQuery['listCategoryLabels'][number]
type Props = {
  dialogState: DialogState;
  category: Category;
  labels: Label[]
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
  labels,
  onClose,
  events,
}) => {
  console.log({ category })
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [maxAmount, setMaxAmount] = useState(category.maxAmount.toString());
  const [selectedLabels, setSelectedLabels] = useState<Label[]>(
    category.labels?.flatMap((l) => {
      if (l == null) return []
      return [{
        id: l.id,
        name: l.name
      }]
    }) ?? []
  );

  const safeParseResult = updateSchema.safeParse({
    id: category.id,
    name,
    maxAmount,
    labels: selectedLabels
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

  const getOptionLabel = useCallback(
    (option: Label): string => option.name,
    [],
  );
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (label: Label) => label.name,
  });
  const handlePaymentChange = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      values: Label[] | null,
    ) => {
      console.log({values })
      setSelectedLabels(values ?? []);
    },
    [],
  );

  const submit = useMutation(updateCategoryDialogUpdateCategoryDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', { category });
      events.onError();
      return;
    }
    console.log({ d: safeParseResult.data.labels })
    try {
      const result = await submit({
        id: safeParseResult.data.id,
        name: safeParseResult.data.name,
        maxAmount: safeParseResult.data.maxAmount,
        labelIds: safeParseResult.data.labels.map((l) => l.id)
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
          <Box mb={3}>
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
          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              上限金額
            </Typography>
            <MoneygerAutocompleteMultiple
              values={selectedLabels}
              options={labels}
              noOptionsText="ラベルがありません"
              ariaLabel="ラベルの設定"
              placeholder={selectedLabels ? '' : 'ラベルを選択'}
              getOptionLabel={getOptionLabel}
              filterOptions={filterOptions}
              onChange={handlePaymentChange}
            />
          </Box>
        </>
      )}
    </MoneygerDialog>
  );
};

export default UpdateCategoryDialog;
