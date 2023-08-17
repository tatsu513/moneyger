'use client';

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  FilterOptionsState,
  TextField,
  Typography,
} from '@mui/material';
import isEqual from 'lodash/isEqual';
import { HTMLAttributes, ReactNode, useCallback } from 'react';

type TimeCardComboBoxProps<T> = {
  id?: string;
  size?: 'small' | 'medium';
  value: T | null;
  options: readonly T[];
  noOptionsText?: string;
  errorMessage?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  label?: string;
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
  getOptionLabel?: (option: T) => string;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: T | null,
  ) => void;
};

const MoneygerAutocomplete = <T,>({
  id,
  size = 'small',
  value,
  options,
  noOptionsText = '該当なし',
  errorMessage,
  disabled,
  ariaLabel,
  label,
  filterOptions,
  getOptionLabel,
  onChange,
}: TimeCardComboBoxProps<T>): React.ReactElement => {
  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const paddingRight = value ? '4px' : '24px';
      return (
        <TextField
          {...params}
          size={size}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            style: { paddingRight, paddingLeft: '16px' },
            'aria-label': ariaLabel,
          }}
          label={label}
          error={!!errorMessage}
          helperText={errorMessage}
        />
      );
    },
    [value, ariaLabel, label, errorMessage],
  );

  const renderOption = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: T) => {
      return (
        <Box {...props} component="li" key={props.id}>
          <Typography sx={{ wordBreak: 'break-all' }}>
            {getOptionLabel ? getOptionLabel(option) : JSON.stringify(option)}
          </Typography>
        </Box>
      );
    },
    [getOptionLabel],
  );

  /**
   * NOTE:
   * AutocompleteのoptionとvalueにObjectを渡すと、参照先についてのwarningが
   * 出るため、ここでdeep equalで比較している
   */
  const isOptionEqualToValue = useCallback((option: T, value: T) => {
    return isEqual(option, value);
  }, []);

  return (
    <Autocomplete
      id={id}
      size={size}
      value={value ?? null}
      multiple={false}
      options={options}
      noOptionsText={noOptionsText}
      disabled={disabled}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      renderInput={renderInput}
      renderOption={renderOption}
      isOptionEqualToValue={isOptionEqualToValue}
    />
  );
};
export default MoneygerAutocomplete;
