import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FilmCardFront } from './FilmCardFront';
import { FilmCardBack } from './FilmCardBack';
import type { Film } from '~/graphql/gen/graphql';

interface FilmCardProps {
  film: Film;
  isFlipped?: boolean;
  onFlip?: () => void;
}

const CardWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  aspectRatio: '2/3',
  position: 'relative',
  perspective: '1000px',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    aspectRatio: '3/4',
  },
}));

const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>(({ isFlipped }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.4s ease-in-out',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const CardFace = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
});

export const FilmCard = ({
  film,
  isFlipped = false,
  onFlip,
}: FilmCardProps) => {
  return (
    <CardWrapper
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFlip?.();
        }
      }}
      aria-label={`${film.title} film card. Click to flip and see details.`}
    >
      <CardInner isFlipped={isFlipped}>
        <CardFace>
          <FilmCardFront film={film} />
        </CardFace>
        <CardFace>
          <FilmCardBack film={film} />
        </CardFace>
      </CardInner>
    </CardWrapper>
  );
};
