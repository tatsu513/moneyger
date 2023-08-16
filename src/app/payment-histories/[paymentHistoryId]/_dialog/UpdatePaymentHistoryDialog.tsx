import CommonLoading from '@/components/common/CommonLoading';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import stringDateToDateTime from '@/logics/stringDateToDateTime';
import {
  noteType,
  paymentDateType,
  priceType,
} from '@/models/paymentHistory';
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
    $paymentId: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    updatePaymentHistory(
      id: $id
      paymentId: $paymentId
      paymentDate: $paymentDate
      price: $price
      note: $note
    )
  }
`);

const editUpdateSchema = z.object({
  id: z.number(),
  paymentId: z.number(),
  paymentDate: paymentDateType,
  price: priceType,
  note: noteType,
});

const updateSchema = z.object({
  id: z.number(),
  paymentId: z.number(),
  paymentDate: z.string(),
  price: priceType,
  note: noteType,
});

type LocalPaymentType = {
  id: number;
  name: string;
};

type Props = {
  dialogState: DialogState;
  paymentHistory: PaymentHistory;
  listPayments: LocalPaymentType[];
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
  listPayments,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [payment, setPayment] = useState<LocalPaymentType | null>(listPayments.find((p) => p.id === paymentHistory.paymentId) ?? null);
  const [price, setPrice] = useState(paymentHistory.price.toString());
  const [note, setNote] = useState(paymentHistory.note);
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(
    stringDateToDateTime(paymentHistory.paymentDate),
  );

  const safeParseResult = editUpdateSchema.safeParse({
    id: paymentHistory.id,
    paymentId: payment?.id,
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
      paymentId: payment?.id,
      paymentDate: paymentDate?.toISO(),
      price,
      note,
    });
    if (!parseResult.success) {
      console.error('入力値を確認してください', {
        payment,
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
        paymentId: parseResult.data.paymentId,
        paymentDate: parseResult.data.paymentDate,
        price: parseResult.data.price,
        note: parseResult.data.note,
      });
      if (result.error) {
        console.error({ error: result.error })
        throw new Error('処理失敗です');
      }
      router.refresh();
      events.onSuccess();
      handleClose();
    } catch (error) {
      console.error('処理失敗です', { error });
      events.onError();
      return;
    }
  }, [submit, handleClose, router, payment, note, price, paymentDate, events]);

  const handlePaymentChange = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      value: LocalPaymentType | null,
    ) => {
      setPayment(value);
    },
    [],
  );

  const getOptionLabel = useCallback(
    (option: LocalPaymentType): string => option.name,
    [],
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (payment: LocalPaymentType) => payment.name,
  });

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
      {paymentHistory == null ? (
        <CommonLoading />
      ) : (
        <>
          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              支払項目
            </Typography>
            <MoneygerAutocomplete
              id="payment-history-category"
              value={payment}
              options={listPayments}
              noOptionsText="支払項目がありません"
              ariaLabel="支払項目の設定"
              getOptionLabel={getOptionLabel}
              filterOptions={filterOptions}
              onChange={handlePaymentChange}
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
              rows={4}
              placeholder="メモ"
            />
          </Box>
        </>
      )}
    </MoneygerDialog>
  );
};

export default UpdatePaymentHistoryDialog;
