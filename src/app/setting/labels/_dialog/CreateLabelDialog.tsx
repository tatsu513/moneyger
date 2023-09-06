import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { categoryIdType, labelType } from '@/models/label';
import DialogState from '@/types/DialogState';
import { Box, IconButton, Slide, TextField, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';
import * as AddIcon from '@mui/icons-material/Add';
import * as CloseIcon from '@mui/icons-material/Close';
import { grey } from '@/color';

const createLabelDialogCreateLabelDocument = graphql(`
  mutation createLabelDialog_CreateLabel(
    $categoryId: Int
    $labels: [String!]!
  ) {
    createCategoryLabel(categoryId: $categoryId, labels: $labels)
  }
`);

const createCategorySchema = z.object({
  categoryId: categoryIdType,
  labels: labelType,
});

type Props = {
  dialogState: DialogState;
  addCategoryId: number | null;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const CreateLabelDialog: React.FC<Props> = ({
  dialogState,
  addCategoryId,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<number | null>(addCategoryId);
  const [labels, setLabels] = useState([{ name: '', index: 0 }]);

  const safeParseResult = createCategorySchema.safeParse({
    categoryId,
    labels: labels.map((l) => l.name),
  });
  console.log({ safeParseResult });

  const handleLabelInput = useCallback((index: number, value: string) => {
    setLabels((prev) =>
      prev.map((p, i) => (index === i ? { name: value, index } : p)),
    );
  }, []);

  const handleAddClick = useCallback(() => {
    setLabels((prev) => [...prev, { name: '', index: prev.length }]);
  }, []);

  const handleDeleteClick = useCallback(
    (index: number) => {
      setLabels(labels.filter((l) => l.index !== index));
    },
    [labels],
  );

  const handleClose = useCallback(() => {
    onClose();
    setCategoryId(null);
    setLabels([{ name: '', index: 0 }]);
  }, [onClose]);

  const submit = useMutation(createLabelDialogCreateLabelDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', { categoryId, labels });
      events.onError();
      return;
    }
    try {
      const result = await submit({
        categoryId: safeParseResult.data.categoryId,
        labels: safeParseResult.data.labels,
      });
      if (result.error) {
        throw new Error('費目の作成に失敗', {
          cause: {
            result,
            safeParseResult,
          },
        });
      }
      router.refresh();
      events.onSuccess();
      handleClose();
    } catch (error) {
      console.error('ラベルの作成に失敗しました', { error });
      events.onError();
      return;
    }
  }, [
    submit,
    handleClose,
    safeParseResult,
    categoryId,
    labels,
    router,
    events,
  ]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="ラベルを作成"
      fullScreen
      TransitionComponent={Transition}
    >
      <Box>
        <Box mb={1}>
          <Typography variant="body1">ラベル名</Typography>
          <Typography variant="caption">※1度に10個まで登録可能</Typography>
        </Box>
        {labels.map((l) => (
          <LabelNameInputBlock
            key={`index-num-${l.index}`}
            label={l}
            onInput={handleLabelInput}
            onDelete={handleDeleteClick}
          />
        ))}
      </Box>
      <Box textAlign="center" mb={4}>
        <TextButton
          label="フォームを追加"
          disabled={labels.length >= 10 || !safeParseResult.success}
          onClick={handleAddClick}
          startIcon={<AddIcon.default />}
        />
      </Box>
      <Box display="flex" flexDirection="column" columnGap={2}>
        <PrimaryButton
          label="登録"
          disabled={!safeParseResult.success}
          onClick={handleSubmit}
        />
        <TextButton label="キャンセル" fullWidth onClick={handleClose} />
      </Box>
    </MoneygerDialog>
  );
};

export default CreateLabelDialog;

type LabelNameInputBlockProps = {
  label: { name: string; index: number };
  onInput: (index: number, value: string) => void;
  onDelete: (index: number) => void;
};
const LabelNameInputBlock: React.FC<LabelNameInputBlockProps> = ({
  label,
  onInput,
  onDelete,
}) => {
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onInput(label.index, e.target.value);
    },
    [label.index, onInput],
  );

  const handleDeleteClick = useCallback(() => {
    onDelete(label.index);
  }, [label.index, onDelete]);
  return (
    <Box mb={1} display="flex" alignItems="center">
      <TextField
        value={label.name}
        fullWidth
        onChange={handleInput}
        placeholder={`ラベル${label.index + 1}を入力`}
        size="small"
      />
      <Box color={grey[400]}>
        <Box>
          <IconButton
            color="inherit"
            onClick={handleDeleteClick}
            size="small"
            disabled={label.index === 0}
          >
            <CloseIcon.default fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide {...props} direction="up" ref={ref} />;
});
