import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick: () => void;
};
const SecondaryButton: React.FC<Props> = ({
  label,
  size,
  fullWidth,
  onClick,
}) => {
  return (
    <Button
      variant="outlined"
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default SecondaryButton;
