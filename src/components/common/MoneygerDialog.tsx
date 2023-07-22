import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material';
import React from 'react';

type Props = DialogProps & {
  title: string;
  actions?: React.ReactNode;
};
const MoneygerDialog: React.FC<Props> = ({ title, actions, ...props }) => {
  return (
    <Dialog {...props} TransitionComponent={props.TransitionComponent}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default MoneygerDialog;
