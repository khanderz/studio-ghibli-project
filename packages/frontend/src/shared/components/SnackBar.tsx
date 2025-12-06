import { Snackbar as MuiSnackBar, Alert, AlertColor } from '@mui/material';
import type { SnackBarProps as MuiSnackbarProps } from '@mui/material/Snackbar';

interface SnackbarProps extends MuiSnackbarProps {
  open: boolean;
  message: string | null;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export const SnackBar = ({
  open,
  message,
  severity = 'info',
  onClose,
  autoHideDuration = 4000,
}: SnackbarProps) => {
  if (!message) {
    return null;
  }

  return (
    <MuiSnackBar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackBar>
  );
};
