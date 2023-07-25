import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import { graphql } from '@/dao/generated/preset';
import { PaymentHistoriesPageQuery } from '@/dao/generated/preset/graphql';
import {
  createPaymentHistorySchema,
  editCreatePaymentHistorySchema,
  priceType,
} from '@/models/paymentHistory';
import DialogState from '@/types/DialogState';
import {
  Box,
  Button,
  Slide,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DateTime } from 'luxon';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';

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

type LocalPaymentsType = PaymentHistoriesPageQuery['listPayments'];
type Props = {
  dialogState: DialogState;
  listPayments: LocalPaymentsType;
  onClose: () => void;
};
const CreatePaymentHistoryDialog: React.FC<Props> = ({
  dialogState,
  listPayments,
  onClose,
}) => {
  const [payment, setPayment] = useState<LocalPaymentsType[number] | null>(
    null,
  );
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(null);
  const [price, setPrice] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const safeParseResult = editCreatePaymentHistorySchema.safeParse({
    paymentId: payment?.id,
    paymentDate,
    price,
    note,
  });
  console.log({ safeParseResult });

  const handlePaymentChange = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      value: LocalPaymentsType[number] | null,
    ) => {
      setPayment(value);
    },
    [],
  );

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
    const parseResult = createPaymentHistorySchema.safeParse({
      payment,
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
      return;
    }
    try {
      const result = await submit({
        paymentId: parseResult.data.paymentId,
        paymentDate: parseResult.data.paymentDate,
        price: parseResult.data.price,
        note: parseResult.data.note,
      });
      if (result.error) {
        throw new Error('処理失敗です');
      }
      onClose();
    } catch (error) {
      console.error('処理失敗です', { error });
      return;
    }
  }, [submit, onClose, payment, paymentDate, price, note]);

  const getOptionLabel = useCallback(
    (option: LocalPaymentsType[number]): string => option.name,
    [],
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (payment: LocalPaymentsType[number]) => payment.name,
  });

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
          支払項目
        </Typography>
        <MoneygerAutocomplete
          id="payment-history-category"
          value={payment}
          options={listPayments}
          noOptionsText="支払項目がありません"
          ariaLabel="支払項目の設定"
          label="支払項目"
          getOptionLabel={getOptionLabel}
          filterOptions={filterOptions}
          onChange={handlePaymentChange}
        />
      </Box>
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
