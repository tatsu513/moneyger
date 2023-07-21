import MoneygerDialog from '@/components/common/MoneygerDialog';
import DialogState from '@/types/DialogState';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';

type Props = {
  dialogState: DialogState;
  onClose: () => void;
};
const AddCategoryDialog: React.FC<Props> = ({ dialogState, onClose }) => {
  const [title, setTitle] = useState('');
  const [limitPrice, setLimitPrice] = useState('');

  const isEnableSubmit = title !== '' && limitPrice !== '';

  const handleChangeTitle = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleChangeLimitPrice = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.target.value === '') {
        setLimitPrice('');
      }
      if (isNaN(Number(e.target.value))) {
        console.warn('入力値が不正です');
        return;
      }
      setLimitPrice(e.target.value);
    },
    [],
  );

  const handleClose = useCallback(() => {
    onClose();
    setTitle('');
    setLimitPrice('');
  }, [onClose]);

  const submit = useCallback(async () => {
    await fetch('http://localhost:3000/api/payments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, limitPrice: Number(limitPrice) }),
    });
  }, [title, limitPrice]);
  return (
    <MoneygerDialog
      state={dialogState}
      onClose={handleClose}
      title="カテゴリを追加"
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="text" onClick={handleClose}>
            キャンセル
          </Button>
          <Button variant="contained" disabled={!isEnableSubmit} onClick={submit}>
            登録
          </Button>
        </Box>
      }
    >
      <Box mb={3}>
        <Typography variant="body1" mb={1}>
          名称
        </Typography>
        <TextField value={title} fullWidth onChange={handleChangeTitle} placeholder="食費" />
      </Box>
      <Box>
        <Typography variant="body1" mb={1}>
          上限金額
        </Typography>
        <TextField
          value={limitPrice}
          fullWidth
          onChange={handleChangeLimitPrice}
          placeholder="10000"
        />
      </Box>
    </MoneygerDialog>
  );
};

export default AddCategoryDialog;
