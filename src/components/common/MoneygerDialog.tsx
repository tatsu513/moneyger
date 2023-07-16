import DialogState from "@/types/DialogState";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { PropsWithChildren } from "react";

type Props = {
  children: React.ReactNode;
  state: DialogState;
  actions?: React.ReactNode;
  title: string;
  onClose: () => void;
};
const MoneygerDialog: React.FC<Props> = ({
  children,
  state,
  actions,
  title,
  onClose,
}) => {
  return (
    <Dialog open={state === "open"} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default MoneygerDialog;
