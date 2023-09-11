'use client';

import MoneygerAutocomplete from '@/components/common/MoneygerAutocomplete';
import { createFilterOptions } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';

type Category = {
  id: number;
  name: string,
}
type Props = {
  options: { id: number; name: string }[] | null;
  selectedValue: Category | null;
  onChange: (value: Category | null) => void;
};
const CategoryAutocomplete: React.FC<Props> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const getOptionLabel = useCallback(
    (option: Category): string => option.name,
    [],
  );
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (label: Category) => label.name,
  });
  const handlePaymentChange = useCallback(
    (_e: SyntheticEvent<Element, Event>, values: Category | null) => {
      onChange(values);
    },
    [onChange],
  )

  return (
    <MoneygerAutocomplete
        id="payment-history-category"
        value={selectedValue}
        options={options ?? []}
        noOptionsText="費目がありません"
        ariaLabel="費目の設定"
        getOptionLabel={getOptionLabel}
        filterOptions={filterOptions}
        onChange={handlePaymentChange}
        size="small"
        placeholder="費目を選択"
      />
  );
};
export default CategoryAutocomplete;
