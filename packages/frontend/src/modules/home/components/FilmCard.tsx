import { Box } from '@mui/material';
import { styled, useTheme, CardColorKey } from '@mui/material/styles';
import { FilmCardFront, FilmCardBack } from './';
import type { Film } from '~/graphql/gen/graphql';

interface FilmCardProps {
  film: Film;
  colorKey: CardColorKey;
  isFlipped?: boolean;
  onFlip?: () => void;
}

const CardWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 368,
  position: 'relative',
  perspective: '1000px',
  cursor: 'pointer',
  borderRadius: 16,
  boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.25)',
  border: `4px solid ${theme.palette.common.white}`,
  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
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

const CardFace = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ bgColor }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: bgColor,
  backfaceVisibility: 'hidden',
}));

export const FilmCard = ({
  film,
  colorKey,
  isFlipped = false,
  onFlip,
}: FilmCardProps) => {
  const theme = useTheme();
  const cardColor = theme.palette.card[colorKey];
  console.log({ cardColor });

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
      aria-label={`${film.title} film card. ${
        isFlipped ? 'Showing details.' : 'Showing poster.'
      } Press Enter or Space to flip.`}
      aria-pressed={isFlipped}
    >
      <CardInner isFlipped={isFlipped}>
        <CardFace bgColor={cardColor}>
          <FilmCardFront film={film} />
        </CardFace>
        <CardFace bgColor={cardColor}>
          <FilmCardBack film={film} />
        </CardFace>
      </CardInner>
    </CardWrapper>
  );
};
