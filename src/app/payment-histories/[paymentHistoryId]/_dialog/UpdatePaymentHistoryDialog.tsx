import { grey } from '@/color';
import CategoryLabelsAutocompleteWithSuspense from '@/components/common/CategoryLabelsAutocompleteWithSuspense';
import CommonLoading from '@/components/common/CommonLoading';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import InlineLoading from '@/components/common/InlineLoading';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import FormContentsBlock from '@/components/common/forms/FormContentsBlock';
import { graphql } from '@/dao/generated/preset';
import {
  CategoryLabel,
  PaymentHistory,
  PaymentHistoryPageListCategoriesQuery,
} from '@/dao/generated/preset/graphql';
import stringDateToDateTime from '@/logics/stringDateToDateTime';
import {
  categoryLabelIdsType,
  categoryLabelsType,
  noteType,
  paymentDateType,
  priceType,
} from '@/models/paymentHistory';
import DialogState from '@/types/DialogState';
import { Box, TextField, Typography, createFilterOptions } from '@mui/material';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, Suspense, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const updatePaymentHistoryDialogUpdatePaymentHistoryDocument = graphql(`
  mutation updatePaymentHistoryDialog_UpdateHistoryPayment(
    $id: Int!
    $categoryId: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
    $labelIds: [Int!]!
  ) {
    updatePaymentHistory(
      id: $id
      categoryId: $categoryId
      paymentDate: $paymentDate
      price: $price
      note: $note
      labelIds: $labelIds
    )
  }
`);

const editUpdateSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  paymentDate: paymentDateType,
  price: priceType,
  note: noteType,
  labels: categoryLabelsType,
});

const updateSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  paymentDate: z.string(),
  price: priceType,
  note: noteType,
  labelIds: categoryLabelIdsType,
});

type ListCategories = PaymentHistoryPageListCategoriesQuery['listCategories'];
type Props = {
  dialogState: DialogState;
  paymentHistory: PaymentHistory;
  listCategories: ListCategories;
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
  const [category, setCategory] = useState<ListCategories[number] | null>(
    listCategories?.find((c) => c.id === paymentHistory.categoryId) ?? null,
  );
  const [price, setPrice] = useState(paymentHistory.price.toString());
  const [note, setNote] = useState(paymentHistory.note);
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(
    stringDateToDateTime(paymentHistory.paymentDate),
  );
  const [labels, setLabels] = useState<CategoryLabel[]>(paymentHistory.labels);

  const safeParseResult = editUpdateSchema.safeParse({
    id: paymentHistory.id,
    categoryId: category?.id,
    paymentDate,
    price,
    note,
    labels,
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
    const data = {
      id: paymentHistory.id,
      categoryId: category?.id,
      paymentDate: paymentDate?.toISO(),
      price,
      note,
      labelIds: labels.map((l) => l.id),
    };
    const parseResult = updateSchema.safeParse(data);
    if (!parseResult.success) {
      console.error('入力値を確認してください', {
        error: parseResult.error,
        data,
      });
      events.onError();
      return;
    }
    try {
      const result = await submit(parseResult.data);
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
    labels,
  ]);

  const handlePaymentChange = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      value: ListCategories[number] | null,
    ) => {
      setCategory(value);
    },
    [],
  );

  const getOptionLabel = useCallback(
    (option: ListCategories[number]): string => option.name,
    [],
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (category: ListCategories[number]) => category.name,
  });

  const handleChange = useCallback((values: CategoryLabel[]) => {
    setLabels(values);
  }, []);

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
          <FormContentsBlock label="費目" required hasMargin>
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
              placeholder="費目を選択"
            />
          </FormContentsBlock>

          <FormContentsBlock label="支払日" required hasMargin>
            <MoneygerDatePicker
              value={paymentDate}
              onChange={handleChangeDate}
            />
          </FormContentsBlock>

          <FormContentsBlock label="支払金額" required hasMargin>
            <TextField
              value={price}
              fullWidth
              onChange={handleChangePrice}
              placeholder="10000"
              size="small"
            />
          </FormContentsBlock>

          <FormContentsBlock label="ラベル" hasMargin>
            {category == null
              ? <Typography variant="body1" color={grey[500]}>費目を選択してください</Typography>
              : (
                <FetchErrorBoundary>
                  <Suspense fallback={<InlineLoading height={40}/>}>
                    <CategoryLabelsAutocompleteWithSuspense
                      selectedValues={labels}
                      categoryId={category.id}
                      onChange={handleChange}
                    />
                  </Suspense>
                </FetchErrorBoundary>
              )
            }
          </FormContentsBlock>

          <FormContentsBlock label="メモ">
            <TextField
              value={note}
              fullWidth
              onChange={handleChangeNote}
              multiline
              rows={3}
              placeholder="メモ"
            />
          </FormContentsBlock>
        </>
      )}
    </MoneygerDialog>
  );
};

export default UpdatePaymentHistoryDialog;
