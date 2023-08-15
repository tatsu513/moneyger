'use client';
import PageTitle from '@/components/common/PageTitle';
import { Box, createFilterOptions } from '@mui/material';
import React, { useCallback, useState } from 'react';
import ListPaymentHistories from '@/app/payment-histories/_main/ListPaymentHistories';
import DialogState from '@/types/DialogState';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import CreatePaymentHistoryDialog from '@/app/payment-histories/_dialog/CreatePaymentHistoryDialog';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';

type ListPayment = {
  id: number;
  name: string;
};
type Props = {
  listPayments: ListPayment[];
  listPaymentHistories: PaymentHistory[];
};
const PaymentHistoriesMain: React.FC<Props> = ({
  listPayments,
  listPaymentHistories,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<ListPayment | null>(
    null,
  );
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);

  const { alertType, setSuccess, setError, setProcessing, setNone } =
    useAlert();

  const handleChangePayment = useCallback(
    (_e: React.SyntheticEvent<Element, Event>, value: ListPayment | null) => {
      const paymentId = value?.id;
      const target = listPayments.find((p) => p.id === paymentId);
      if (target == null) {
        setSelectedPayment(null);
        return;
      }
      setSelectedPayment({ id: target.id, name: target.name });
    },
    [listPayments],
  );

  const getOptionLabel = useCallback(
    (option: ListPayment): string => option.name,
    [],
  );

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (payment: ListPayment) => payment.name,
  });
  return (
    <Box>
      <MoneygerSnackBar
        state={alertType}
        successMessage="支払いの登録に成功しました"
        errorMessage="支払いの登録に失敗しました"
        processingMessage="支払いを登録中です"
        onClose={setNone}
      />
      <Box>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PageTitle title="お支払い" />
          <SecondaryButton label="追加する" size="small" onClick={dialogOpen} />
        </Box>

        <Box mb={2}>
          <MoneygerAutocomplete
            id="payment-histories-payment"
            options={listPayments}
            value={
              listPayments.find((p) => p.id === selectedPayment?.id) ?? null
            }
            label="すべて"
            filterOptions={filterOptions}
            getOptionLabel={getOptionLabel}
            onChange={handleChangePayment}
          />
        </Box>
      </Box>
      <ListPaymentHistories
        paymentId={selectedPayment?.id ?? null}
        initialState={listPaymentHistories}
      />
      <CreatePaymentHistoryDialog
        dialogState={dialogState}
        listPayments={listPayments}
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
