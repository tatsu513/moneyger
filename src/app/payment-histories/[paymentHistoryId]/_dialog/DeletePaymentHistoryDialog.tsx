import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { PaymentHistory } from '@/dao/generated/preset/graphql';
import PrismaDateToFrontendDateStr from '@/logics/PrismaDateToFrontendDateStr';
import DialogState from '@/types/DialogState';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';

const deletePaymentHistoryDeleteDialogDeletePaymentDocument = graphql(`
  mutation deletePaymentHistoryDialog_DeletePaymentHistory($id: Int!) {
    deletePaymentHistory(id: $id)
  }
`);

type Props = {
  dialogState: DialogState;
  paymentHistory: PaymentHistory;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const DeletePaymentHistoryDialog: React.FC<Props> = ({
  dialogState,
  paymentHistory,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const onCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);

  const submit = useMutation(
    deletePaymentHistoryDeleteDialogDeletePaymentDocument,
  )[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!checked) return;
    try {
      const result = await submit({ id: paymentHistory.id });
      if (result.error) {
        throw new Error('削除に失敗しました');
      }
      router.refresh();
      events.onSuccess();
      router.push('/payment-histories');
    } catch (error) {
      console.error('削除に失敗しました', { error });
      events.onError();
      return;
    }
  }, [router, paymentHistory.id, checked, submit, events]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="支払項目を削除"
      fullWidth
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <TextButton label="キャンセル" onClick={onClose} />
          <PrimaryButton
            label="削除"
            disabled={!checked}
            onClick={handleSubmit}
          />
        </Box>
      }
    >
      {paymentHistory == null ? (
        <CommonLoading />
      ) : (
        <Box>
          <Typography variant="body2" mb={2}>
            以下のカテゴリを削除します。
          </Typography>
          <Typography variant="body1" mb={0.5}>
            支払日：{PrismaDateToFrontendDateStr(paymentHistory.paymentDate)}
          </Typography>
          <Typography variant="body1" mb={2}>
            支払金額：{paymentHistory.price.toLocaleString()}円
          </Typography>
          <Typography variant="body1" mb={2}>
            メモ：{paymentHistory.note ?? '-'}円
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={onCheck} />}
              label={
                <Typography variant="body2">
                  削除した内容は元に戻すことはできません。削除してよろしいですか？
                </Typography>
              }
            />
          </FormGroup>
        </Box>
      )}
    </MoneygerDialog>
  );
};

export default DeletePaymentHistoryDialog;
