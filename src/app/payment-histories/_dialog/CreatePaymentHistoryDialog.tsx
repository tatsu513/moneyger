import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import InlineLoading from '@/components/common/InlineLoading';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import MoneygerAutocompleteMultiple from '@/components/common/MoneygerAutocompleteMultiple';
import MoneygerDatePicker from '@/components/common/MoneygerDatePicker';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import FormContentsBlock from '@/components/common/forms/FormContentsBlock';
import { graphql } from '@/dao/generated/preset';
import { CategoryLabel, PaymentHistoriesPageQuery } from '@/dao/generated/preset/graphql';
import {
  createPaymentHistorySchema,
  editCreatePaymentHistorySchema,
  priceType,
} from '@/models/paymentHistory';
import DialogState from '@/types/DialogState';
import getUrqlVariables from '@/util/getUrqlVariables';
import {
  Box,
  Slide,
  TextField,
  createFilterOptions,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useQuery } from '@urql/next';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, Dispatch, SetStateAction, Suspense, SyntheticEvent, useCallback, useMemo, useState } from 'react';
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

  const [category, setCategory] = useState<LocalCategoryType[number] | null>(
    null,
  );
  const [paymentDate, setPaymentDate] = useState<DateTime | null>(null);
  const [price, setPrice] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [labels, setLabels] = useState<CategoryLabel[]>([])

  const safeParseResult = editCreatePaymentHistorySchema.safeParse({
    categoryId: category?.id,
    paymentDate,
    price,
    note,
  });

  const handlePaymentChange = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      value: LocalCategoryType[number] | null,
    ) => {
      setCategory(value);
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
    setCategory(null);
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
      categoryId: category?.id,
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
  }, [submit, handleClose, category, paymentDate, price, note, router, events]);

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
      <FormContentsBlock label='費目' required hasMargin>
        <MoneygerAutocomplete
          id="payment-history-category"
          value={category}
          options={listCategories}
          noOptionsText="費目がありません"
          ariaLabel="費目の設定"
          getOptionLabel={getOptionLabel}
          filterOptions={filterOptions}
          onChange={handlePaymentChange}
        />
      </FormContentsBlock>

      <FormContentsBlock label='支払日' required hasMargin>
        <MoneygerDatePicker value={paymentDate} onChange={handleChangeDate} />
      </FormContentsBlock>

      <FormContentsBlock label='支払金額' required hasMargin>
        <TextField
          value={price}
          fullWidth
          onChange={handleChangePrice}
          placeholder="10000"
          size="small"
        />
      </FormContentsBlock>

      <FormContentsBlock label='ラベル' hasMargin>
        <FetchErrorBoundary>
          <Suspense fallback={<InlineLoading height={40}/>}>
            <CategoryLabelsBlock category={category} values={labels} setLabels={setLabels}/>
          </Suspense>
        </FetchErrorBoundary>
      </FormContentsBlock>
      
      <FormContentsBlock label='メモ' hasMargin>
        <TextField
          value={note}
          fullWidth
          onChange={handleChangeNote}
          multiline
          rows={3}
          placeholder="メモ"
        />
      </FormContentsBlock>
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

const createPaymentHistoryDialog = graphql(`
  query listCategoryLabelsFromCategoryId($categoryId: Int!) {
    listCategoryLabelsFromCategoryId(categoryId: $categoryId) {
      id
      name
    }
  }
`)

type CategoryLabelsBlockProps = {
  category: LocalCategoryType[number] | null;
  values: CategoryLabel[]
  setLabels: Dispatch<SetStateAction<CategoryLabel[]>>
}
const CategoryLabelsBlock: React.FC<CategoryLabelsBlockProps> = ({ category, values, setLabels }) => {
  const val = useMemo(() => {
    return getUrqlVariables(
      createPaymentHistoryDialog,
      { categoryId: category?.id ?? 0 },
      true,
      category?.id == null
    )
  }, [category])
  const [{ data }] = useQuery(val);
  console.log({ data, id: category })
  const options = useMemo(() => data?.listCategoryLabelsFromCategoryId ?? [], [data?.listCategoryLabelsFromCategoryId])

  const getOptionLabel = useCallback(
    (option: CategoryLabel): string => option.name,
    [],
  );
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (label: CategoryLabel) => label.name,
  });
  const handlePaymentChange = useCallback(
    (
      _e: SyntheticEvent<Element, Event>,
      values: CategoryLabel[] | null,
    ) => {
      setLabels(values ?? []);
    },
    [setLabels],
  );

  const placeholder = useMemo(() => {
    if (category == null) {
      return "費目を選択してください"
    }
    if (options.length === 0) {
      return "費目ラベルが未設定です"
    }
    if (values.length === 0) {
      return "ラベルを選択"
    }
    return ""
  }, [category, options, values])

  return (
    <MoneygerAutocompleteMultiple
      values={values}
      options={options}
      noOptionsText="ラベルがありません"
      placeholder={placeholder}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      onChange={handlePaymentChange}
      disabled={category == null}
    />
  )
}