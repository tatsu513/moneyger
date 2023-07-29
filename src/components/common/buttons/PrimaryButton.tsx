import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick: () => void;
};
const PrimaryButton: React.FC<Props> = ({
  label,
  fullWidth = false,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
