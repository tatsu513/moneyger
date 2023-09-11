import CommonLoading from '@/components/common/CommonLoading';
import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { SettingLabelsPageQuery } from '@/dao/generated/preset/graphql';
import DialogState from '@/types/DialogState';
import { Box, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const updateLabelDialogUpdateCategoryLabelDocument = graphql(`
  mutation createLabelDialog_UpdateCategoryLabel(
    $categoryLabelId: Int!
    $name: String!
  ) {
    updateCategoryLabel(categoryLabelId: $categoryLabelId, name: $name)
  }
`);

const updateSchema = z.object({
  categoryLabelId: z.number(),
  name: z.string(),
});

type Label = SettingLabelsPageQuery['listCategoryLabels'][number];
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
const UpdateLabelDialog: React.FC<Props> = ({
  dialogState,
  label,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [name, setName] = useState(label.name);

  const safeParseResult = updateSchema.safeParse({
    categoryLabelId: label.id,
    name,
  });

  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handleClose = useCallback(() => {
    onClose();
    setName(label.name);
  }, [label, onClose]);

  const submit = useMutation(updateLabelDialogUpdateCategoryLabelDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', { name });
      events.onError();
      return;
    }
    try {
      const result = await submit({
        categoryLabelId: safeParseResult.data.categoryLabelId,
        name: safeParseResult.data.name,
      });
      if (result.error) {
        throw new Error('費目の更新に失敗しました');
      }
      router.refresh();
      events.onSuccess();
      onClose();
      handleClose();
    } catch (error) {
      console.error('費目の更新に失敗しました', { error });
      events.onError();
      return;
    }
  }, [safeParseResult, name, submit, handleClose, router, events, onClose]);

  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={handleClose}
      title="ラベルを編集"
      fullWidth
      actions={
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <TextButton label="キャンセル" onClick={handleClose} />
          <PrimaryButton
            label="更新する"
            disabled={!safeParseResult.success}
            onClick={handleSubmit}
          />
        </Box>
      }
    >
      {label == null ? (
        <CommonLoading />
      ) : (
        <>
          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              名称
            </Typography>
            <TextField
              value={name}
              fullWidth
              onChange={handleChangeName}
              placeholder="ラベル名を入力"
              size="small"
            />
          </Box>
        </>
      )}
    </MoneygerDialog>
  );
};

export default UpdateLabelDialog;
