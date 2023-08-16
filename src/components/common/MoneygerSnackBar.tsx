import { green, grey, red } from '@/color';
import AlertType from '@/types/AlertType';
import { Alert, Box, Slide, SlideProps, Snackbar } from '@mui/material';
import React from 'react';

type Props = {
  state: AlertType;
  successMessage: string;
  errorMessage: string;
  processingMessage: string;
  onClose: () => void;
};
const MoneygerSnackBar: React.FC<Props> = ({
  state,
  successMessage,
  errorMessage,
  processingMessage,
  onClose,
}) => {
  return (
    <Box width="100%">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state !== 'none'}
        autoHideDuration={5000}
        action={null}
        TransitionComponent={TransitionDown}
        onClose={onClose}
        key={'top' + 'center'}
      >
        <Box width="100%">
          {state === 'success' && (
            <SuccessSnackAlert message={successMessage} onClose={onClose} />
          )}
          {state === 'error' && (
            <ErrorSnackAlert message={errorMessage} onClose={onClose} />
          )}
          {state === 'processing' && (
            <ProcessingSnackAlert
              message={processingMessage}
              onClose={onClose}
            />
          )}
        </Box>
      </Snackbar>
    </Box>
  );
};

export default MoneygerSnackBar;

type SnackBarProps = {
  message: string;
  onClose: () => void;
};
const SuccessSnackAlert: React.FC<SnackBarProps> = ({ message, onClose }) => {
  return (
    <Alert
      onClose={onClose}
      severity="success"
      sx={{ width: '100%', backgroundColor: green[900], color: grey[0] }}
    >
      {message}
    </Alert>
  );
};

const ErrorSnackAlert: React.FC<SnackBarProps> = ({ message, onClose }) => {
  return (
    <Alert
      onClose={onClose}
      severity="error"
      sx={{ width: '100%', backgroundColor: red[900], color: grey[0] }}
    >
      {message}
    </Alert>
  );
};

const ProcessingSnackAlert: React.FC<SnackBarProps> = ({
  message,
  onClose,
}) => {
  return (
    <Alert
      onClose={onClose}
      severity="info"
      sx={{ width: '100%', backgroundColor: grey[500], color: grey[0] }}
    >
      {message}
    </Alert>
  );
};

const TransitionDown = (props: SlideProps) => {
  return <Slide {...props} direction="down" />;
};
