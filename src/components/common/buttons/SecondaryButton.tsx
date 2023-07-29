import { Button } from '@mui/material';
import React from 'react';

type Props = {
  label: string;
  fullWidth?: boolean;
  onClick: () => void;
};
const SecondaryButton: React.FC<Props> = ({
  fullWidth = false,
  onClick,
  label,
}) => {
  return (
    <Button variant="outlined" fullWidth={fullWidth} onClick={onClick}>
      {label}
    </Button>
  );
};

export default SecondaryButton;
