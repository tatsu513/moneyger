'use client';

import MoneygerAutocompleteMultiple from '@/components/common/MoneygerAutocompleteMultiple';
import { CategoryLabel } from '@/dao/generated/preset/graphql';
import { createFilterOptions } from '@mui/material';
import { SyntheticEvent, useCallback, useMemo } from 'react';

type CategoryLabelsAutocompleteProps = {
  options: { id: number; name: string }[] | null;
  selectedValues: CategoryLabel[];
  onChange: (values: CategoryLabel[]) => void;
};
const CategoryLabelsAutocomplete: React.FC<CategoryLabelsAutocompleteProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const getOptionLabel = useCallback(
    (option: CategoryLabel): string => option.name,
    [],
  );
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (label: CategoryLabel) => label.name,
  });
  const handlePaymentChange = useCallback(
    (_e: SyntheticEvent<Element, Event>, values: CategoryLabel[] | null) => {
      onChange(values ?? []);
    },
    [onChange],
  );

  const placeholder = useMemo(() => {
    if (options == null || options?.length === 0) {
      return '費目ラベルが未設定です';
    }
    if (selectedValues.length === 0) {
      return 'ラベルを選択';
    }
    return '';
  }, [options, selectedValues]);

  return (
    <MoneygerAutocompleteMultiple
      values={selectedValues}
      options={options ?? []}
      noOptionsText="ラベルがありません"
      placeholder={placeholder}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      onChange={handlePaymentChange}
      disabled={options == null}
    />
  );
};
export default CategoryLabelsAutocomplete;
