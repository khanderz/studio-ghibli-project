import { CircularProgress } from '@mui/material';
import type { Film } from '~/graphql/gen/graphql';
import {
  ContinueButtonWrapper,
  ContinueButton,
  ContinueEllipse,
  ContinueArrow,
} from '../../../shared/styles/theme/components';

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
