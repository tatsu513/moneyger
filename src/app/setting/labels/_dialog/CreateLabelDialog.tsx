import MoneygerDialog from '@/components/common/MoneygerDialog';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import TextButton from '@/components/common/buttons/TextButton';
import { graphql } from '@/dao/generated/preset';
import { categoryIdType } from '@/models/label';
import DialogState from '@/types/DialogState';
import {
  Box,
  Divider,
  IconButton,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import { z } from 'zod';
import * as AddIcon from '@mui/icons-material/Add';
import * as CloseIcon from '@mui/icons-material/Close';
import { grey } from '@/color';
import { SettingLabelsPageQuery } from '@/dao/generated/preset/graphql';
import CategoryAutocomplete from '@/components/CategoryAutocomplete';

const createLabelDialogCreateLabelDocument = graphql(`
  mutation createLabelDialog_CreateLabel($input: [CreateCategoryLabelInput!]!) {
    createCategoryLabel(input: $input)
  }
`);

const createCategorySchema = z.array(
  z.object({
    categoryId: categoryIdType.nullable(),
    label: z.string().min(1),
  }),
);

type Categories = SettingLabelsPageQuery['listCategories'];
type EditCategories = {
  label: string;
  categoryId: string | null;
  index: number;
};
type Props = {
  dialogState: DialogState;
  categories: Categories;
  onClose: () => void;
  events: {
    onSuccess: () => void;
    onError: () => void;
    onProcessing: () => void;
  };
};
const CreateLabelDialog: React.FC<Props> = ({
  dialogState,
  categories,
  onClose,
  events,
}) => {
  const router = useRouter();
  const [data, setData] = useState<EditCategories[]>([
    { label: '', categoryId: null, index: 0 },
  ]);
  const safeParseResult = createCategorySchema.safeParse(
    data.map((d) => ({
      label: d.label,
      categoryId: d.categoryId != null ? Number(d.categoryId) : null,
    })),
  );

  const handleLabelInput = useCallback((index: number, value: string) => {
    setData((prev) =>
      prev.map((p, i) => (index === i ? { ...p, label: value } : p)),
    );
  }, []);

  const handleCategoryChange = useCallback(
    (index: number, value: Categories[number] | null) => {
      setData((prev) =>
        prev.map((p, i) =>
          index === i ? { ...p, categoryId: value?.id.toString() ?? null } : p,
        ),
      );
    },
    [setData],
  );

  const handleDeleteClick = useCallback(
    (index: number) => {
      setData(data.filter((d) => d.index !== index));
    },
    [data, setData],
  );

  const handleAddClick = useCallback(() => {
    setData((prev) => [
      ...prev,
      { label: '', index: prev.length, categoryId: null },
    ]);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setData([{ label: '', categoryId: null, index: 0 }]);
  }, [onClose]);

  const submit = useMutation(createLabelDialogCreateLabelDocument)[1];
  const handleSubmit = useCallback(async () => {
    events.onProcessing();
    if (!safeParseResult.success) {
      console.error('入力値を確認してください', { data });
      events.onError();
      return;
    }
    try {
      const result = await submit({ input: safeParseResult.data });
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
  }, [submit, handleClose, safeParseResult, router, events, data]);
  return (
    <MoneygerDialog
      open={dialogState === 'open'}
      onClose={onClose}
      title="ラベルを作成"
      fullScreen
      TransitionComponent={Transition}
    >
      <Box>
        <Box mb={1.5}>
          <Typography variant="body1">ラベル名</Typography>
          <Typography variant="caption">※1度に10個まで登録可能</Typography>
        </Box>
        {data.map((d, i) => (
          <Box mb={1.5} key={`index-num-${d.index}`}>
            <Typography variant="body2" mb={1}>{`ラベル${i + 1}`}</Typography>
            <LabelNameInputBlock
              label={{ name: d.label, index: d.index }}
              selectedCategory={
                categories.find((c) => c.id.toString() === d.categoryId) ?? null
              }
              categories={categories}
              onInput={handleLabelInput}
              onChange={handleCategoryChange}
              onDelete={handleDeleteClick}
            />
            <Divider />
          </Box>
        ))}
      </Box>
      <Box textAlign="center" mb={4}>
        <TextButton
          label="フォームを追加"
          disabled={data.length >= 10 || !safeParseResult.success}
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
  selectedCategory: Categories[number] | null;
  categories: Categories;
  onInput: (index: number, value: string) => void;
  onChange: (index: number, value: Categories[number] | null) => void;
  onDelete: (index: number) => void;
};
const LabelNameInputBlock: React.FC<LabelNameInputBlockProps> = ({
  label,
  selectedCategory,
  categories,
  onInput,
  onChange,
  onDelete,
}) => {
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onInput(label.index, e.target.value);
    },
    [label.index, onInput],
  );

  const handleOnChange = useCallback(
    (value: Categories[number] | null) => {
      onChange(label.index, value);
    },
    [label.index, onChange],
  );

  const handleDeleteClick = useCallback(() => {
    onDelete(label.index);
  }, [label.index, onDelete]);
  return (
    <Box display="flex" alignItems="center" columnGap={1} mb={1}>
      <Box mb={1} display="flex" flexDirection="column" flex={1} rowGap={1}>
        <TextField
          value={label.name}
          fullWidth
          onChange={handleInput}
          placeholder={`ラベル${label.index + 1}を入力`}
          size="small"
        />
        <CategoryAutocomplete
          selectedValue={selectedCategory}
          options={categories}
          onChange={handleOnChange}
        />
      </Box>
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
