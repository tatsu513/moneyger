import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import { graphql } from '@/dao/generated/preset';
import { Payment } from '@/dao/generated/preset/graphql';
import { noteType, paymentDateType, priceType } from '@/models/paymentHistory';
import DialogState from '@/types/DialogState';
import { Box, Button, Slide, TextField, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DateTime } from 'luxon';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const createPaymentHistoryDialogCreatePaymentDocument = graphql(`
  mutation createPaymentHistoryDialog_CreatePaymentHistory(
    $paymentId: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    createPaymentHistory(
      paymentId: $paymentId
      paymentDate: $paymentDate
      price: $price
      note: $note
    )
  }
`);

const createPaymentHistorySchema = z.object({
  paymentId: z.number(),
  paymentDate: paymentDateType,
  price: priceType,
  note: noteType,
});

type Props = {
  dialogState: DialogState;
  onClose: () => void;
};
const CreatePaymentHistoryDialog: React.FC<Props> = ({
  dialogState,
  onClose,
}) => {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(null);
  const [price, setPrice] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const safeParseResult = createPaymentHistorySchema.safeParse({
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
    setPaymentDate(null);
    setPrice('');
    setNote('');
  }, [onClose]);

  const submit = useMutation(
    createPaymentHistoryDialogCreatePaymentDocument,
  )[1];
  const handleSubmit = useCallback(async () => {
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', {
        payment,
        paymentDate,
        price,
        note,
      });
      return;
    }
    try {
      const result = await submit({
        paymentId: safeParseResult.data.paymentId,
        paymentDate: safeParseResult.data.paymentDate,
        price: safeParseResult.data.price,
        note: safeParseResult.data.note,
      });
      if (result.error) {
        throw new Error('処理失敗です');
      }
      onClose();
    } catch (error) {
      console.error('処理失敗です', { error });
      return;
    }
  }, [submit, onClose, safeParseResult, payment, paymentDate, price, note]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="支払項目を追加"
      fullScreen
      TransitionComponent={Transition}
    >
      <Box mb={3}>
        <Typography variant="body1" mb={1}>
          支払日
        </Typography>
        <MoneygerDatePicker value={paymentDate} onChange={handleChangeDate} />
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
      <Box mb={3}>
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
      <Box display="flex" flexDirection="column" columnGap={2}>
        <Button
          variant="contained"
          disabled={!safeParseResult.success}
          onClick={handleSubmit}
        >
          追加する
        </Button>
        <Button variant="text" onClick={handleClose} fullWidth>
          キャンセル
        </Button>
      </Box>
    </MoneygerDialog>
  );
};

export default CreatePaymentHistoryDialog;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
