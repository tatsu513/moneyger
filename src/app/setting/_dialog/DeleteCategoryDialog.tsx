import MoneygerDialog from '@/components/common/MoneygerDialog';
import DialogState from '@/types/DialogState';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';

type Props = {
  dialogState: DialogState;
  onClose: () => void;
};
const DeleteCategoryDialog: React.FC<Props> = ({ dialogState, onClose }) => {
  const [checked, setChecked] = useState(false);

  const onCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);
  return (
    <MoneygerDialog
      state={dialogState}
      onClose={onClose}
      title="カテゴリを削除"
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="text" onClick={onClose}>
            キャンセル
          </Button>
          <Button variant="contained" disabled={!checked}>
            削除
          </Button>
        </Box>
      }
    >
      <Box>
        <Typography variant="body2" mb={2}>
          以下のカテゴリを削除します。
        </Typography>
        <Typography variant="body1" mb={0.5}>
          名称：{accounts.title}
        </Typography>
        <Typography variant="body1" mb={2}>
          上限：{accounts.limitPrice.toLocaleString()}円
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
    </MoneygerDialog>
  );
};

export default DeleteCategoryDialog;

const accounts = {
  id: '1',
  title: '食費',
  limitPrice: 0,
};
