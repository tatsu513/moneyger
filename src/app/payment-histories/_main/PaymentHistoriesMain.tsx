'use client';
import CommonLoading from '@/components/common/CommonLoading';
import FetchErrorBoundary from '@/components/common/FetchErrorBoundary';
import MainContentsWrapper from '@/components/common/MainContentsWrapper';
import PageTitle from '@/components/common/PageTitle';
import { Box, Fab, Typography, createFilterOptions } from '@mui/material';
import React, { Suspense, useCallback, useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import ListPaymentHistoriesWithSuspense from '@/app/payment-histories/_main/ListPaymentHistoriesWithSuspense';
import DialogState from '@/types/DialogState';
import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import { grey } from '@/color';

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
      <MainContentsWrapper>
        <PageTitle title="支払履歴一覧" />

        <Box mb={2} mt={2}>
          <MoneygerAutocomplete
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
      </MainContentsWrapper>
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

      <Box
        sx={{
          position: 'fixed',
          top: 'auto',
          bottom: 32,
          right: 16,
          left: 'auto',
        }}
      >
        <Fab variant="extended" size="medium" onClick={dialogOpen}>
          <AddIcon sx={{ mr: 0.5 }} />
          支払履歴を追加
        </Fab>
      </Box>
      {/* <CreatePaymentDialog dialogState={dialogState} onClose={dialogClose} /> */}
    </Box>
  );
};

export default PaymentHistoriesMain;
