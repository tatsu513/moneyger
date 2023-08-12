'use client';

import React, { useCallback, useState } from 'react';
import { Box, Divider, List, Typography } from '@mui/material';
import PageTitle from '@/components/common/PageTitle';
import DialogState from '@/types/DialogState';
import CreatePaymentDialog from '@/app/payments/_dialog/CreatePaymentDialog';
import { Payment } from '@/dao/generated/preset/graphql';
import PaymentListItem from '@/app/payments/_main/PaymentListItem';
import SecondaryButton from '@/components/common/buttons/SecondaryButton';
import { grey } from '@/color';

type Props = {
  payments: Payment[];
};
const PaymentsMain: React.FC<Props> = ({ payments }) => {
  const [dialogState, setDialogState] = useState<DialogState>('closed');
  const dialogOpen = useCallback(() => setDialogState('open'), []);
  const dialogClose = useCallback(() => setDialogState('closed'), []);

  return (
    <Box>
      <Box
        pb={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <PageTitle title="家計簿" />
        <SecondaryButton label="追加する" size="small" onClick={dialogOpen} />
      </Box>
      {payments.length === 0 ? (
        <Typography variant='body1' color={grey[500]}>データが登録されていません</Typography>
      ) : (
        <List>
          <Divider component="li" />
          {payments.map((p) => (
            <PaymentListItem key={p.name} {...p} />
          ))}
        </List>
      )}
      <CreatePaymentDialog dialogState={dialogState} onClose={dialogClose} />
    </Box>
  );
};

export default PaymentsMain;
