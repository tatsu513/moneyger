import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode
  onClick: () => void;
};
const TextButton: React.FC<Props> = ({
  label,
  fullWidth = false,
  disabled = false,
  startIcon,
  onClick,
}) => {
  return (
    <Button
      variant="text"
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
    >
      {label}
    </Button>
  );
};

export default TextButton;
