import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick: () => void;
};
const PrimaryButton: React.FC<Props> = ({
  label,
  size,
  fullWidth,
  disabled,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
