'use client';
import CategoriesListItem from '@/app/_main/CategoriesListItem';
import { graphql } from '@/dao/generated/preset/gql';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import dateTimeToStringDate from '@/logics/dateTimeToStringDate';
import getUrqlVariables from '@/util/getUrqlVariables';
import { Box, List, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { useQuery } from 'urql';

const topPageCategoriesDocument = graphql(`
  query topPageCategories($targetDate: String!) {
    listCategories(targetDate: $targetDate) {
      id
      name
      maxAmount
      currentAmount
    }
  }
`);

type Props = {
  listCategories: PaymentSummaryQuery['listCategories'];
  targetDate: DateTime;
};
const CategoriesSummary: React.FC<Props> = ({ listCategories, targetDate }) => {
  const val = useMemo(() => {
    return getUrqlVariables(
      topPageCategoriesDocument,
      { targetDate: dateTimeToStringDate(targetDate) },
      false,
    );
  }, [targetDate]);
  const [{ data }] = useQuery(val);
  const categories = useMemo(() => {
    return data == null ? listCategories : data.listCategories;
  }, [data, listCategories]);
  return (
    <Box>
      {categories.length === 0 ? (
        <Typography variant="body1" color={grey[500]} mt={1}>
          データが登録されていません
        </Typography>
      ) : (
        <List disablePadding>
          {categories.map((c) => (
            <CategoriesListItem key={c.name} {...c} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default CategoriesSummary;
