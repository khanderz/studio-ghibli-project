import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FilmButtonProps {
  filmName: string;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const StyledButton = styled(Button)(({ theme }) => ({
  minHeight: '60px',
  fontSize: '18px',
  fontWeight: 600,
  textTransform: 'none',
  padding: theme.spacing(2, 3),
  borderRadius: '8px',
  '&:disabled': {
    opacity: 0.6,
  },
}));

export const FilmButton = ({
  filmName,
  onClick,
  isLoading = false,
  disabled = false,
}: FilmButtonProps) => {
  return (
    <StyledButton
      variant="contained"
      onClick={onClick}
      disabled={disabled || isLoading}
      fullWidth
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : filmName}
    </StyledButton>
  );
};
