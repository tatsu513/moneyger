'use client';
import PageTitle from '@/components/common/PageTitle';
import { Box, createFilterOptions } from '@mui/material';
import React, { useCallback, useState } from 'react';
import ListPaymentHistories from '@/app/payment-histories/_main/ListPaymentHistories';
import DialogState from '@/types/DialogState';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import CreatePaymentHistoryDialog from '@/app/payment-histories/_dialog/CreatePaymentHistoryDialog';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';

type ListCategory = {
  id: number;
  name: string;
};
type Props = {
  listCategories: ListCategory[];
  listPaymentHistories: PaymentHistory[];
};
const PaymentHistoriesMain: React.FC<Props> = ({
  listCategories,
  listPaymentHistories,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<ListCategory | null>(
    null,
  );
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);

  const { alertType, setSuccess, setError, setProcessing, setNone } =
    useAlert();

  const handleChangePayment = useCallback(
    (_e: React.SyntheticEvent<Element, Event>, value: ListCategory | null) => {
      const paymentId = value?.id;
      const target = listCategories.find((p) => p.id === paymentId);
      if (target == null) {
        setSelectedPayment(null);
        return;
      }
      setSelectedPayment({ id: target.id, name: target.name });
    },
    [listCategories],
  );

  const getOptionLabel = useCallback(
    (option: ListCategory): string => option.name,
    [],
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (payment: ListCategory) => payment.name,
  });
  return (
    <Box>
      <MoneygerSnackBar
        state={alertType}
        successMessage="支払いの登録に成功しました"
        errorMessage="支払いの登録に失敗しました"
        processingMessage="支払いを登録中..."
        onClose={setNone}
      />
      <Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PageTitle title="支払い" />
          <PrimaryButton label="追加" size="small" onClick={dialogOpen} />
        </Box>

        <Box mb={2}>
          <MoneygerAutocomplete
            id="payment-histories-payment"
            options={listCategories}
            value={
              listCategories.find((p) => p.id === selectedPayment?.id) ?? null
            }
            label="絞り込み"
            filterOptions={filterOptions}
            getOptionLabel={getOptionLabel}
            onChange={handleChangePayment}
            size="small"
          />
        </Box>
      </Box>
      <ListPaymentHistories
        paymentId={selectedPayment?.id ?? null}
        initialState={listPaymentHistories}
      />
      <CreatePaymentHistoryDialog
        dialogState={dialogState}
        listCategories={listCategories}
        onClose={dialogClose}
        events={{
          onSuccess: setSuccess,
          onError: setError,
          onProcessing: setProcessing,
        }}
      />
    </Box>
  );
};

export default PaymentHistoriesMain;
