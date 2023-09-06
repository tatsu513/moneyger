import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { z } from 'zod';

/** @package */
const tabStateSchema = z.enum(['MAX', 'CURRENT', 'ROOM']);
export type TabState = z.infer<typeof tabStateSchema>;

type Props = {
  value: TabState;
  onChangeOrderBy: (tab: TabState) => void;
};

const MoneygerToggleButtonGroup: React.FC<Props> = ({
  value,
  onChangeOrderBy,
}) => {
  const handleChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newVal: string) => {
      const result = tabStateSchema.parse(newVal);
      onChangeOrderBy(result);
    },
    [onChangeOrderBy],
  );
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="MAX" size="small">
        <Typography variant="toggleButton">上限</Typography>
      </ToggleButton>
      <ToggleButton value="CURRENT" size="small">
        <Typography variant="toggleButton">支払済</Typography>
      </ToggleButton>
      <ToggleButton value="ROOM" size="small">
        <Typography variant="toggleButton">残り</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default MoneygerToggleButtonGroup;
