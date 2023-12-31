import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
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

type PaymentHistory = {
  id: number;
  note: string | null;
  paymentDate: string;
  price: number;
};
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
        throw new Error('支払いの削除に失敗しました');
      }
      events.onSuccess();
      router.refresh();
      onClose();
    } catch (error) {
      console.error('支払いの削除に失敗しました', { error });
      events.onError();
      return;
    }
  }, [paymentHistory.id, checked, submit, events, onClose, router]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="支払いを削除"
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
            メモ：{paymentHistory.note ?? '-'}
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
