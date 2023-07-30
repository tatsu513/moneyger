'use client';
import CommonLoading from '@/components/common/CommonLoading';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import PageTitle from '@/components/common/PageTitle';
import { Box, Typography, createFilterOptions } from '@mui/material';
import React, { Suspense, useCallback, useState } from 'react';
import ListPaymentHistoriesWithSuspense from '@/app/payment-histories/_main/ListPaymentHistoriesWithSuspense';
import DialogState from '@/types/DialogState';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import { grey } from '@/color';
import CreatePaymentHistoryDialog from '@/app/payment-histories/_dialog/CreatePaymentHistoryDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';

type ListPayment = {
  id: number;
  name: string;
};
type Props = {
  listPayments: ListPayment[];
};
const PaymentHistoriesMain: React.FC<Props> = ({ listPayments }) => {
  const [selectedPayment, setSelectedPayment] = useState<ListPayment | null>(
    null,
  );
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);

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
      <Box px={2}>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PageTitle title="お支払履歴" />
          <PrimaryButton label="追加する" size="small" onClick={dialogOpen} />
        </Box>

        <Box mb={2}>
          <MoneygerAutocomplete
            id="payment-histories-payment"
            options={listPayments}
            value={
              listPayments.find((p) => p.id === selectedPayment?.id) ?? null
            }
            label="支払項目を選択"
            filterOptions={filterOptions}
            getOptionLabel={getOptionLabel}
            onChange={handleChangePayment}
          />
        </Box>
      </Box>
      {selectedPayment == null ? (
        <Typography variant="body1" color={grey[500]} px={2}>
          支払項目を選択してください
        </Typography>
      ) : (
        <FetchErrorBoundary>
          <Suspense fallback={<CommonLoading />}>
            <ListPaymentHistoriesWithSuspense paymentId={selectedPayment.id} />
          </Suspense>
        </FetchErrorBoundary>
      )}
      <CreatePaymentHistoryDialog
        dialogState={dialogState}
        listPayments={listPayments}
        onClose={dialogClose}
      />
    </Box>
  );
};

export default PaymentHistoriesMain;
