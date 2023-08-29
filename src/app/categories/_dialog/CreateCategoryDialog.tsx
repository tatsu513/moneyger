import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { maxAmountType, nameType } from '@/models/category';
import DialogState from '@/types/DialogState';
import { Box, Slide, TextField, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';

const createCategoryDialogCreateCategoryDocument = graphql(`
  mutation createCategoryDialog_CreateCategory(
    $name: String!
    $maxAmount: Int!
  ) {
    createPayment(name: $name, maxAmount: $maxAmount)
  }
`);

const createCategorySchema = z.object({
  name: nameType,
  maxAmount: maxAmountType,
});

type Props = {
  dialogState: DialogState;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const CreateCategoryDialog: React.FC<Props> = ({
  dialogState,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const safeParseResult = createCategorySchema.safeParse({
    name,
    maxAmount,
  });

  const handleChangeName = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  const handleChangeMaxAmount = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.target.value === '') setMaxAmount('');
      if (!maxAmountType.safeParse(e.target.value).success) {
        console.warn('入力値が不正です');
        return;
      }
      setMaxAmount(e.target.value);
    },
    [],
  );

  const handleClose = useCallback(() => {
    onClose();
    setName('');
    setMaxAmount('');
  }, [onClose]);

  const submit = useMutation(createCategoryDialogCreateCategoryDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', { name, maxAmount });
      events.onError();
      return;
    }
    try {
      const result = await submit({
        name: safeParseResult.data.name,
        maxAmount: safeParseResult.data.maxAmount,
      });
      if (result.error) {
        throw new Error('費目の作成に失敗しました');
      }
      router.refresh();
      events.onSuccess();
      handleClose();
    } catch (error) {
      console.error('費目の作成に失敗しました', { error });
      events.onError();
      return;
    }
  }, [submit, handleClose, safeParseResult, name, maxAmount, router, events]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="費目を追加"
      fullScreen
      TransitionComponent={Transition}
    >
      <Box mb={3}>
        <Typography variant="body1" mb={1}>
          費目名
        </Typography>
        <TextField
          value={name}
          fullWidth
          onChange={handleChangeName}
          placeholder="食費"
          size="small"
        />
      </Box>
      <Box mb={3}>
        <Typography variant="body1" mb={1}>
          上限金額
        </Typography>
        <TextField
          value={maxAmount}
          fullWidth
          onChange={handleChangeMaxAmount}
          placeholder="10000"
          size="small"
        />
      </Box>
      <Box display="flex" flexDirection="column" columnGap={2}>
        <PrimaryButton
          label="追加"
          disabled={!safeParseResult.success}
          onClick={handleSubmit}
        />
        <TextButton label="キャンセル" fullWidth onClick={handleClose} />
      </Box>
    </MoneygerDialog>
  );
};

export default CreateCategoryDialog;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
