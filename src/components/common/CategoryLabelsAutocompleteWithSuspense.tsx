"use client"
import CategoryLabelsAutocomplete from '@/components/common/CategoryLabelsAutocomplete';
import { graphql } from '@/dao/generated/preset/gql';
import { CategoryLabel } from '@/dao/generated/preset/graphql';
import getUrqlVariables from '@/util/getUrqlVariables';
import { useQuery } from '@urql/next';
import { useMemo } from 'react';
import { z } from 'zod';

const updatePaymentHistoryDialogDocument = graphql(`
  query updatePaymentHistoryDialog($categoryId: Int!) {
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
      updatePaymentHistoryDialogDocument,
      { categoryId },
      true,
    );
  }, [categoryId]);
  const [{ data }] = useQuery(val);
  const results = schema.parse(data?.listCategoryLabelsByCategoryId);
  return (
    <CategoryLabelsAutocomplete
      selectedValues={selectedValues}
      options={results ?? []}
      onChange={onChange}
    />
  );
};

export default CategoryLabelsAutocompleteWithSuspense;
