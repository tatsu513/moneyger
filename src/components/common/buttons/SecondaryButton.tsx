import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  onClick: () => void;
};
const SecondaryButton: React.FC<Props> = ({
  label,
  size,
  fullWidth,
  startIcon,
  onClick,
}) => {
  return (
    <Button
      variant="outlined"
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
      startIcon={startIcon}
    >
      {label}
    </Button>
  );
};

export default SecondaryButton;
