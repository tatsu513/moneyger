import CommonLoading from '@/components/common/CommonLoading';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import stringDateToDateTime from '@/logics/stringDateToDateTime';
import { noteType, paymentDateType, priceType } from '@/models/paymentHistory';
import DialogState from '@/types/DialogState';
import { Box, TextField, Typography, createFilterOptions } from '@mui/material';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const updatePaymentHistoryDialogUpdatePaymentHistoryDocument = graphql(`
  mutation createPaymentHistoryDialog_UpdateHistoryPayment(
    $id: Int!
    $categoryId: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    updatePaymentHistory(
      id: $id
      categoryId: $categoryId
      paymentDate: $paymentDate
      price: $price
      note: $note
    )
  }
`);

const editUpdateSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  paymentDate: paymentDateType,
  price: priceType,
  note: noteType,
});

const updateSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  paymentDate: z.string(),
  price: priceType,
  note: noteType,
});

type LocalCategoryType = {
  id: number;
  name: string;
};

type Props = {
  dialogState: DialogState;
  paymentHistory: PaymentHistory;
  listCategories: LocalCategoryType[];
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const UpdatePaymentHistoryDialog: React.FC<Props> = ({
  dialogState,
  paymentHistory,
  listCategories,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [category, setCategory] = useState<LocalCategoryType | null>(
    listCategories.find((p) => p.id === paymentHistory.categoryId) ?? null,
  );
  const [price, setPrice] = useState(paymentHistory.price.toString());
  const [note, setNote] = useState(paymentHistory.note);
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(
    stringDateToDateTime(paymentHistory.paymentDate),
  );

  const safeParseResult = editUpdateSchema.safeParse({
    id: paymentHistory.id,
    categoryId: category?.id,
    paymentDate,
    price,
    note,
  });

  const handleChangeDate = useCallback((date: DateTime | null) => {
    setPaymentDate(date);
  }, []);

  const handleChangePrice = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.target.value === '') setPrice('');
      if (!priceType.safeParse(e.target.value).success) {
        console.warn('入力値が不正です');
        return;
      }
      setPrice(e.target.value);
    },
    [],
  );

  const handleChangeNote = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNote(e.target.value);
    },
    [],
  );

  const handleClose = useCallback(() => {
    onClose();
    setPaymentDate(stringDateToDateTime(paymentHistory.paymentDate));
    setPrice(paymentHistory.price.toString());
    setNote(paymentHistory.note);
  }, [paymentHistory, onClose]);

  const submit = useMutation(
    updatePaymentHistoryDialogUpdatePaymentHistoryDocument,
  )[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    const parseResult = updateSchema.safeParse({
      id: paymentHistory.id,
      categoryId: category?.id,
      paymentDate: paymentDate?.toISO(),
      price,
      note,
    });
    if (!parseResult.success) {
      console.error('入力値を確認してください', {
        category,
        paymentDate,
        price,
        note,
      });
      events.onError();
      return;
    }
    try {
      const result = await submit({
        id: parseResult.data.id,
        categoryId: parseResult.data.categoryId,
        paymentDate: parseResult.data.paymentDate,
        price: parseResult.data.price,
        note: parseResult.data.note,
      });
      if (result.error) {
        console.error({ error: result.error });
        throw new Error('支払いの更新に失敗しました');
      }
      router.refresh();
      events.onSuccess();
      handleClose();
    } catch (error) {
      console.error('支払いの更新に失敗しました', { error });
      events.onError();
      return;
    }
  }, [
    submit,
    handleClose,
    paymentHistory.id,
    router,
    category,
    note,
    price,
    paymentDate,
    events,
  ]);

  const handlePaymentChange = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      value: LocalCategoryType | null,
    ) => {
      setCategory(value);
    },
    [],
  );

  const getOptionLabel = useCallback(
    (option: LocalCategoryType): string => option.name,
    [],
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (category: LocalCategoryType) => category.name,
  });

  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={handleClose}
      title="支払いを編集"
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
      {paymentHistory == null ? (
        <CommonLoading />
      ) : (
        <>
          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              費目
            </Typography>
            <MoneygerAutocomplete
              id="payment-history-category"
              value={category}
              options={listCategories}
              noOptionsText="費目がありません"
              ariaLabel="費目の設定"
              getOptionLabel={getOptionLabel}
              filterOptions={filterOptions}
              onChange={handlePaymentChange}
              size="small"
            />
          </Box>
          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              支払日
            </Typography>
            <MoneygerDatePicker
              value={paymentDate}
              onChange={handleChangeDate}
            />
          </Box>
          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              支払金額
            </Typography>
            <TextField
              value={price}
              fullWidth
              onChange={handleChangePrice}
              placeholder="10000"
              size="small"
            />
          </Box>

          <Box>
            <Typography variant="body1" mb={1}>
              メモ
            </Typography>
            <TextField
              value={note}
              fullWidth
              onChange={handleChangeNote}
              multiline
              rows={3}
              placeholder="メモ"
            />
          </Box>
        </>
      )}
    </MoneygerDialog>
  );
};

export default UpdatePaymentHistoryDialog;
