import { Snackbar, Alert, AlertColor } from '@mui/material';

interface AppSnackbarProps {
  open: boolean;
  message: string | null;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export const AppSnackbar = ({
  open,
  message,
  severity = 'info',
  onClose,
  autoHideDuration = 4000,
}: AppSnackbarProps) => {
  if (!message) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
