import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick: () => void;
};
const TextButton: React.FC<Props> = ({
  label,
  fullWidth = false,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant="text"
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default TextButton;
