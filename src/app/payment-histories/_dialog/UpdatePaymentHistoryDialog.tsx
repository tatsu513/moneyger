import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import { graphql } from '@/dao/generated/preset';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import stringDateToDateTime from '@/logics/stringDateToDateTime';
import { noteType, paymentDateType, priceType } from '@/models/paymentHistory';
import DialogState from '@/types/DialogState';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const updatePaymentHistoryDialogUpdatePaymentHistoryDocument = graphql(`
  mutation createPaymentHistoryDialog_UpdateHistoryPayment(
    $id: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    updatePaymentHistory(
      id: $id
      paymentDate: $paymentDate
      price: $price
      note: $note
    )
  }
`);

const updateSchema = z.object({
  id: z.number(),
  paymentDate: paymentDateType,
  price: priceType,
  note: noteType,
});

type Props = {
  dialogState: DialogState;
  paymentHistory: PaymentHistory;
  onClose: () => void;
};
const UpdatePaymentHistoryDialog: React.FC<Props> = ({
  dialogState,
  paymentHistory,
  onClose,
}) => {
  const router = useRouter();
  const [price, setPrice] = useState(paymentHistory.price.toString());
  const [note, setNote] = useState(paymentHistory.note);
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(
    stringDateToDateTime(paymentHistory.paymentDate),
  );

  const safeParseResult = updateSchema.safeParse({
    id: paymentHistory.id,
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
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', {
        id: paymentHistory.id,
        paymentDate,
        price,
        note,
      });
      return;
    }
    try {
      const result = await submit({
        id: safeParseResult.data.id,
        paymentDate: safeParseResult.data.paymentDate,
        price: safeParseResult.data.price,
        note: safeParseResult.data.note,
      });
      if (result.error) {
        throw new Error('処理失敗です');
      }
      router.refresh();
      onClose();
    } catch (error) {
      console.error('処理失敗です', { error });
      return;
    }
  }, [
    safeParseResult,
    paymentHistory,
    submit,
    onClose,
    router,
    note,
    price,
    paymentDate,
  ]);

  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={handleClose}
      title="内容を編集"
      fullWidth
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="text" onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            variant="contained"
            disabled={!safeParseResult.success}
            onClick={handleSubmit}
          >
            更新する
          </Button>
        </Box>
      }
    >
      {paymentHistory == null ? (
        <CommonLoading />
      ) : (
        <>
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
