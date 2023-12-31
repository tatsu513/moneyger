'use client';

import {
  PaymentHistory,
  PaymentHistoryPageListCategoriesQuery,
} from '@/dao/generated/preset/graphql';
import DialogState from '@/types/DialogState';
import { Box, Chip, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import UpdatePaymentHistoryDialog from '@/app/payment-histories/[paymentHistoryId]/_dialog/UpdatePaymentHistoryDialog';
import PrismaDateToFrontendDateStr from '@/logics/PrismaDateToFrontendDateStr';
import { grey } from '@/color';
import MoneygerSnackBar from '@/components/common/MoneygerSnackBar';
import useAlert from '@/hooks/useAlert';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import RowContentsBlock from '@/components/common/RowContentsBlock';
import PageTitle from '@/components/common/PageTitle';
import TextButton from '@/components/common/buttons/TextButton';
import { useRouter } from 'next/navigation';
import * as ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type Props = {
  paymentHistory: PaymentHistory;
  listCategories: PaymentHistoryPageListCategoriesQuery['listCategories'];
};
const PaymentHistoryMain: React.FC<Props> = ({
  paymentHistory,
  listCategories,
}) => {
  const router = useRouter();
  const [updateDialogState, setUpdateDialogState] =
    useState<DialogState>('closed');
  const {
    alertType: updateAlertType,
    setSuccess: updateSetSuccess,
    setError: updateSetError,
    setProcessing: updateSetProcessing,
    setNone: updateSetNone,
  } = useAlert();
  const updateDialogOpen = useCallback(() => {
    setUpdateDialogState('open');
  }, []);
  const closeDialog = useCallback(() => {
    setUpdateDialogState('closed');
  }, []);

  const category = listCategories.find(
    (p) => p.id === paymentHistory.categoryId,
  );
  const labelContents = useMemo(() => {
    return (
      <Box display="flex" justifyContent="flex-end" columnGap={1}>
        {paymentHistory?.labels?.map((l) => (
          <Chip key={l.id.toString()} label={l.name} size="small" />
        )) ?? <></>}
      </Box>
    );
  }, [paymentHistory?.labels]);

  const back = useCallback(() => {
    router.push('/payment-histories');
  }, [router]);

  if (category == null) {
    return (
      <Typography variant="body1" color={grey[500]}>
        費目が見つかりません
      </Typography>
    );
  }

  return (
    <>
      <MoneygerSnackBar
        state={updateAlertType}
        successMessage="支払いの更新に成功しました"
        errorMessage="支払いの更新に失敗しました"
        processingMessage="支払いを更新中..."
        onClose={updateSetNone}
      />
      <Box mb={1}>
        <TextButton
          label="一覧へ"
          startIcon={<ArrowBackIosNewIcon.default />}
          onClick={back}
        />
      </Box>

      <Box mb={2}>
        <PageTitle title="支払い詳細" />
      </Box>

      <RowContentsBlock title="費目" body={category?.name ?? '-'} />
      <RowContentsBlock
        title="支払日"
        body={PrismaDateToFrontendDateStr(paymentHistory.paymentDate)}
      />
      <RowContentsBlock
        title="金額"
        body={paymentHistory.price.toLocaleString() + '円'}
      />
      <RowContentsBlock title="ラベル" body={labelContents} />
      <RowContentsBlock title="メモ" body={paymentHistory.note ?? '-'} />

      <Box mt={2}>
        <PrimaryButton label="編集" fullWidth onClick={updateDialogOpen} />
      </Box>

      <UpdatePaymentHistoryDialog
        dialogState={updateDialogState}
        paymentHistory={paymentHistory}
        listCategories={listCategories}
        onClose={closeDialog}
        events={{
          onSuccess: updateSetSuccess,
          onError: updateSetError,
          onProcessing: updateSetProcessing,
        }}
      />
    </>
  );
};

export default PaymentHistoryMain;
