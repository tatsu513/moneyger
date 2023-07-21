'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';

type Props = {
  itemId: string;
};

const PaymentMain: React.FC<Props> = () => {
  const [value, setValue] = useState<string>('');
  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [],
  );
  return (
    <>
      <Typography variant="h2">食費</Typography>

      <Box>
        <Typography variant="body1">上限</Typography>
        <TextField value={value} fullWidth onChange={onChange} />
      </Box>

      <Box>
        <Typography variant="body1">使用金額</Typography>
        <TextField value={value} fullWidth onChange={onChange} />
      </Box>

      <Button variant="contained">変更を保存</Button>
      <Button variant="text">支払金額を追加する</Button>
    </>
  );
};

export default PaymentMain;
