import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
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
  Slide,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';

const createPaymentHistoryDialogCreatePaymentDocument = graphql(`
  mutation createPaymentHistoryDialog_CreatePaymentHistory(
    $categoryId: Int!
    $paymentDate: String!
    $price: Int!
    $note: String
  ) {
    createPaymentHistory(
      categoryId: $categoryId
      paymentDate: $paymentDate
      price: $price
      note: $note
    )
  }
`);

type LocalCategoryType = PaymentHistoriesPageQuery['listCategories'];
type Props = {
  dialogState: DialogState;
  listCategories: LocalCategoryType;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const CreatePaymentHistoryDialog: React.FC<Props> = ({
  dialogState,
  listCategories,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [payment, setPayment] = useState<LocalCategoryType[number] | null>(
    null,
  );
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(null);
  const [price, setPrice] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const safeParseResult = editCreatePaymentHistorySchema.safeParse({
    categoryId: payment?.id,
    paymentDate,
    price,
    note,
  });

  const handlePaymentChange = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      value: LocalCategoryType[number] | null,
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
    setPayment(null);
    setPaymentDate(null);
    setPrice('');
    setNote('');
  }, [onClose]);

  const submit = useMutation(
    createPaymentHistoryDialogCreatePaymentDocument,
  )[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    const data = {
      categoryId: payment?.id,
      paymentDate: paymentDate?.toISO(),
      price: Number(price),
      note,
    };
    const parseResult = createPaymentHistorySchema.safeParse({ ...data });
    if (!parseResult.success) {
      console.error('入力値を確認してください', {
        err: parseResult.error,
        data,
      });
      events.onError();
      return;
    }
    try {
      const result = await submit({
        categoryId: parseResult.data.categoryId,
        paymentDate: parseResult.data.paymentDate,
        price: parseResult.data.price,
        note: parseResult.data.note,
      });
      if (result.error) {
        throw new Error('支払いの作成に失敗しました');
      }
      router.refresh();
      events.onSuccess();
      handleClose();
    } catch (error) {
      console.error('支払いの作成に失敗しました', { error });
      events.onError();
      return;
    }
  }, [submit, handleClose, payment, paymentDate, price, note, router, events]);

  const getOptionLabel = useCallback(
    (option: LocalCategoryType[number]): string => option.name,
    [],
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (payment: LocalCategoryType[number]) => payment.name,
  });

  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="費目を追加"
      fullScreen
      TransitionComponent={Transition}
    >
      <Box mb={3}>
        <Typography variant="body1" mb={1}>
          費目
        </Typography>
        <MoneygerAutocomplete
          id="payment-history-category"
          value={payment}
          options={listCategories}
          noOptionsText="費目がありません"
          ariaLabel="費目の設定"
          label="費目"
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
          size="small"
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
          rows={3}
          placeholder="メモ"
        />
      </Box>
      <Box display="flex" flexDirection="column" columnGap={2}>
        <PrimaryButton
          label="追加する"
          disabled={!safeParseResult.success}
          onClick={handleSubmit}
        />
        <TextButton label="キャンセル" fullWidth onClick={handleClose} />
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
