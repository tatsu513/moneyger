import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import React from 'react';

type Props = {
  value: DateTime | null;
  onChange: (date: DateTime | null) => void;
};

const MoneygerDatePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      sx={{ width: '100%' }}
      closeOnSelect
      disableFuture
    />
  );
};

export default MoneygerDatePicker;
