import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { SettingLabelsPageQuery } from '@/dao/generated/preset/graphql';
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

const deleteCategoryDialogDeleteCategoryLabelDocument = graphql(`
  mutation deleteCategoryDialog_DeleteCategoryLabel($categoryLabelId: Int!) {
    deleteCaregoryLabel(categoryLabelId: $categoryLabelId)
  }
`);

type Label = SettingLabelsPageQuery['listCategoryLabels'][number]
type Props = {
  dialogState: DialogState;
  label: Label;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const DeleteLabelDialog: React.FC<Props> = ({
  dialogState,
  label,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const onCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);

  const submit = useMutation(deleteCategoryDialogDeleteCategoryLabelDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!checked) return;
    try {
      const result = await submit({ categoryLabelId: label.id });
      if (result.error) {
        throw new Error('ラベルの削除に失敗しました');
      }
      router.refresh()
      events.onSuccess();
      onClose()
    } catch (error) {
      console.error('ラベルの削除に失敗しました', { error });
      events.onError();
      return;
    }
  }, [router, label.id, checked, submit, events, onClose]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="ラベルを削除"
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
      {label == null ? (
        <CommonLoading />
      ) : (
        <Box>
          <Typography variant="body2" mb={2}>
            以下のラベルを削除します。
          </Typography>
          <Typography variant="body1" mb={0.5}>
            名称：{label.name}
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

export default DeleteLabelDialog;
