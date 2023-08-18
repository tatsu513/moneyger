'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Box, IconButton, List, Typography } from '@mui/material';
import PageTitle from '@/components/common/PageTitle';
import DialogState from '@/types/DialogState';
import CreatePaymentDialog from '@/app/payments/_dialog/CreatePaymentDialog';
import { Payment } from '@/dao/generated/preset/graphql';
import PaymentListItem from '@/app/payments/_main/PaymentListItem';
import { grey } from '@/color';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import MoneygerToggleButtonGroup, { TabState } from '@/app/payments/_main/MoneygerToggleButtonGroup';
import * as SortIcon from '@mui/icons-material/Sort';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';

type Props = {
  payments: Payment[];
};
const PaymentsMain: React.FC<Props> = ({ payments }) => {
  const [orderBy, setOrderBy] = useState<TabState>('ROOM');
  const [sort, setSort] = useState<'decs' | 'asc'>('decs')
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const { alertType, setSuccess, setError, setProcessing, setNone } =
    useAlert();

  const sortedPayments = useMemo(() => {
    switch (orderBy) {
      case 'MAX': {
        return sort === 'decs'
          ? payments.sort((a, b) => (a.maxAmount < b.maxAmount ? 1 : -1))
          : payments.sort((a, b) => (a.maxAmount > b.maxAmount ? 1 : -1))
      }
      case 'CURRENT': {
        return sort === 'decs'
          ? payments.sort((a, b) => (a.currentAmount < b.currentAmount ? 1 : -1))
          : payments.sort((a, b) => (a.currentAmount > b.currentAmount ? 1 : -1))
      }
      case 'ROOM': {
        return sort === 'decs'
          ? payments.sort((a, b) => ((a.maxAmount - a.currentAmount) < (b.maxAmount - b.currentAmount) ? 1 : -1))
          : payments.sort((a, b) => ((a.maxAmount - a.currentAmount) > (b.maxAmount - b.currentAmount) ? 1 : -1))
      }
    }
  }, [orderBy, sort, payments]);


  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);

  const handleChangeOrderBy = useCallback((value: TabState) => {
    setOrderBy(value)
  }, [])
  const handleChangeSort = useCallback(() => {
    if (sort === 'decs') {
      setSort('asc');
      return
    }
    if (sort === 'asc') setSort('decs');
  }, [sort, setSort])

  return (
    <Box>
      <MoneygerSnackBar
        state={alertType}
        successMessage="費目の登録に成功しました"
        errorMessage="費目の登録に失敗しました"
        processingMessage="費目を登録中..."
        onClose={setNone}
      />
      <Box
        mb={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <PageTitle title="費目" />
        <PrimaryButton label="追加" size="small" onClick={dialogOpen} />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Box>
          <IconButton
            aria-label="sort" 
            color="primary"
            onClick={handleChangeSort}
            sx={{
              transform: sort === 'decs' ? 'rotate(0deg)' : 'rotate(180deg)'
            }}
          >
            <SortIcon.default />
          </IconButton>
          <MoneygerToggleButtonGroup value={orderBy} onChangeOrderBy={handleChangeOrderBy}/>
        </Box>
      </Box>

      {sortedPayments.length === 0 ? (
        <Typography variant="body1" color={grey[500]}>
          データが登録されていません
        </Typography>
      ) : (
        <List>
          {sortedPayments.map((p) => (
            <PaymentListItem key={p.name} {...p} />
          ))}
        </List>
      )}
      <CreatePaymentDialog
        dialogState={dialogState}
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

export default PaymentsMain;
