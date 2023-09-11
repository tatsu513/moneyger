"use client"
import MoneygerAutocompleteMultiple from '@/components/common/MoneygerAutocompleteMultiple';
import { graphql } from '@/dao/generated/preset/gql';
import { CategoryLabel } from '@/dao/generated/preset/graphql';
import getUrqlVariables from '@/util/getUrqlVariables';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useQuery } from '@urql/next';
import { SyntheticEvent, useCallback, useMemo } from 'react';
import { z } from 'zod';

const categoryLabelsAutocompleteWithSuspenseDocument = graphql(`
  query categoryLabelsAutocompleteWithSuspense($categoryId: Int!) {
    listCategoryLabelsByCategoryId(categoryId: $categoryId) {
      id
      name
      categoryId
    }
  }
`);

const schema = z.array(
  z.object({
    id: z.number(),
    name: z.string().min(1),
    categoryId: z.number().nullable(),
  }),
);
type Prop = {
  selectedValues: CategoryLabel[];
  categoryId: number;
  onChange: (values: CategoryLabel[]) => void;
};
const CategoryLabelsAutocompleteWithSuspense: React.FC<Prop> = ({
  selectedValues,
  categoryId,
  onChange,
}) => {
  const val = useMemo(() => {
    return getUrqlVariables(
      categoryLabelsAutocompleteWithSuspenseDocument,
      { categoryId },
      true,
      categoryId === null
    );
  }, [categoryId]);
  const [{ data }] = useQuery(val);
  const results = schema.parse(data?.listCategoryLabelsByCategoryId);

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
    if (results == null || results?.length === 0) {
      return '費目ラベルが未設定です';
    }
    if (selectedValues.length === 0) {
      return 'ラベルを選択';
    }
    return '';
  }, [results, selectedValues]);

  return (
    <MoneygerAutocompleteMultiple
      values={selectedValues}
      options={results ?? []}
      noOptionsText="ラベルがありません"
      placeholder={placeholder}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      onChange={handlePaymentChange}
      disabled={results == null}
    />
  );
};

export default CategoryLabelsAutocompleteWithSuspense;
