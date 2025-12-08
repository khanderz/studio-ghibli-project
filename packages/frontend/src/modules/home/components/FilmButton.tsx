import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Film } from '~/graphql/gen/graphql';

interface FilmButtonProps {
  accessibleTitle: Film['title'];
  onFlip: () => void;
  isLoading: boolean;
}

export const FilmButton = ({
  accessibleTitle,
  onFlip,
  isLoading = false,
}: FilmButtonProps) => {
  const ContinueButtonWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  });

  const ContinueButton = styled('button')(() => ({
    width: 55,
    height: 55,
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const ContinueEllipse = styled('div')(({ theme }) => ({
    width: 55,
    height: 55,
    padding: '26.8px 16.7px 26.2px 16px',
    borderRadius: '50%',
    border: `2px solid ${theme.palette.common.white}`,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const ContinueArrow = styled('div')(({ theme }) => ({
    position: 'relative',
    width: 22.3,
    height: 2,
    backgroundColor: theme.palette.common.white,
    borderRadius: 1,

    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '4px solid transparent',
      borderBottom: '4px solid transparent',
      borderLeft: `6px solid ${theme.palette.common.white}`,
    },
  }));
  return (
    <ContinueButtonWrapper>
      <ContinueButton
        type="button"
        aria-label={
          isLoading ? `Loading ${accessibleTitle}` : `Select ${accessibleTitle}`
        }
        onClick={(event) => {
          event.stopPropagation();
          if (!isLoading) {
            onFlip();
          }
        }}
      >
        <ContinueEllipse>
          {isLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            <ContinueArrow />
          )}
        </ContinueEllipse>
      </ContinueButton>
    </ContinueButtonWrapper>
  );
};
