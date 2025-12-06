import { Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Film } from '~/graphql/gen/graphql';

interface FilmButtonProps {
  filmName: Film['title'];
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
  '&:focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
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
      aria-busy={isLoading}
      aria-label={
        isLoading ? `Loading ${filmName}...` : `View ${filmName} details`
      }
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : filmName}
    </StyledButton>
  );
};
