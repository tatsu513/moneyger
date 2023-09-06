'use client';
import { Box, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { CategoryLabel } from '@/dao/generated/preset/graphql';

type Props = {
  labels: CategoryLabel[];
};

const DisplayCategoryLabelsList: React.FC<Props> = ({ labels }) => {
  return (
    <Box textAlign="left" width="100%" display="flex" alignItems="center">
      {/* <Typography variant='caption' flex={1}>ラベル：</Typography> */}
      <Stack direction="row" spacing={1} flex={5.5}>
        {labels?.map((l) => (
          <Chip
            key={l.id.toString()}
            label={<Typography variant="caption">{l.name}</Typography>}
            size="small"
          />
        )) ?? <></>}
      </Stack>
    </Box>
  );
};

export default DisplayCategoryLabelsList;
