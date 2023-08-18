import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { Payment } from '@/dao/generated/preset/graphql';
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

const deletePaymentDialogDeletePaymentDocument = graphql(`
  mutation deletePaymentDialog_DeletePayment($id: Int!) {
    deletePayment(id: $id)
  }
`);

type Props = {
  dialogState: DialogState;
  payment: Payment;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const DeletePaymentDialog: React.FC<Props> = ({
  dialogState,
  payment,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const onCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);

  const submit = useMutation(deletePaymentDialogDeletePaymentDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!checked) return;
    try {
      const result = await submit({ id: payment.id });
      if (result.error) {
        throw new Error('削除に失敗しました');
      }
      events.onSuccess();
      router.push('/payments');
    } catch (error) {
      console.error('削除に失敗しました', { error });
      events.onError();
      return;
    }
  }, [router, payment.id, checked, submit, events]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="費目を削除"
      fullWidth
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <TextButton label="キャンセル" onClick={onClose} />
          <PrimaryButton
            label="更新する"
            disabled={!checked}
            onClick={handleSubmit}
          />
        </Box>
      }
    >
      {payment == null ? (
        <CommonLoading />
      ) : (
        <Box>
          <Typography variant="body2" mb={2}>
            以下のカテゴリを削除します。
          </Typography>
          <Typography variant="body1" mb={0.5}>
            名称：{payment.name}
          </Typography>
          <Typography variant="body1" mb={2}>
            上限：{payment.maxAmount.toLocaleString()}円
          </Typography>
          <Typography variant="body1" mb={2}>
            支払済：{payment.currentAmount.toLocaleString()}円
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

export default DeletePaymentDialog;
