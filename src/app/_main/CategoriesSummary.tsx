'use client';
import CategoriesListItem from '@/app/_main/CategoriesListItem';
import { PaymentSummaryQuery } from '@/dao/generated/preset/graphql';
import { Box, List, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

type Props = {
  listCategories: PaymentSummaryQuery['listCategories'];
};
const CategoriesSummary: React.FC<Props> = ({ listCategories }) => {
  return (
    <Box>
      {listCategories.length === 0 ? (
        <Typography variant="body1" color={grey[500]} mt={1}>
          データが登録されていません
        </Typography>
      ) : (
        <List>
          {listCategories.map((c) => (
            <CategoriesListItem key={c.name} {...c} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default CategoriesSummary;
