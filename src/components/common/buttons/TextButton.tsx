import { grey } from '@/color';
import theme from '@/theme';
import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'small' | 'normal';
  onClick: () => void;
};
const TextButton: React.FC<Props> = ({
  label,
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  size = ' normal',
  onClick,
}) => {
  return (
    <Button
      variant="text"
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        color: grey[900],
        fontSize:
          size === 'normal'
            ? theme.typography.body1.fontSize
            : theme.typography.body2.fontSize,
      }}
    >
      {label}
    </Button>
  );
};

export default TextButton;
