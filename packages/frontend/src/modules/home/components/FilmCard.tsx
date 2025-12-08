import { KeyboardEventHandler } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme, type Theme } from '@mui/material/styles';
import { FilmCardFront, FilmCardBack, FilmButton } from '.';
import type { Film } from '~/graphql/gen/graphql';
import type { CardColorKey } from '../../shared/styles/theme';
import { FilmInfo } from '../../../static/films';

interface FilmCardProps {
  baseInfo: FilmInfo;
  film: Film | null;
  colorKey: CardColorKey;
  isSelected: boolean;
  isFlipped: boolean;
  isLoading: boolean;
  onFlip: () => void;
}

const CARD_BORDER_RADIUS = 16;
const CARD_WIDTH = 290;
const CARD_HEIGHT = 368;

const CardWrapper = styled(Box)(({ theme }: Theme) => ({
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  border: `4px solid ${theme.palette.common.white}`,
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
}));

const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>(({ isFlipped }) => ({
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.4s ease-in-out',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const BaseFace = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ bgColor }) => ({
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: CARD_BORDER_RADIUS,
  overflow: 'hidden',
  backgroundColor: bgColor,
  backfaceVisibility: 'hidden',
}));

const FrontFace = styled(BaseFace)({});

const BackFace = styled(BaseFace)({
  transform: 'rotateY(180deg)',
});

const SelectionSurface = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'banner',
})<{ banner: string }>(({ theme, banner }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  transition:
    'background-image 0.3s ease, transform 0.2s ease, background-color 0.3s ease',
  '&:hover': {
    backgroundImage: `url(${banner})`,
    transform: 'translateY(-2px)',
  },
}));

const SelectionTitle = styled('div')(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.common.white,
}));

export const FilmCard = ({
  baseInfo,
  film,
  colorKey,
  isSelected = false,
  isFlipped = false,
  isLoading = false,
  onFlip,
}: FilmCardProps) => {
  const theme = useTheme<Theme>();
  const frontColor = theme.palette.card[colorKey];
  const backColor = theme.palette.common.white;
  const banner = film?.banner ?? '';
  const accessibleTitle = film?.title ?? baseInfo.title;

  console.log({
    baseInfo,
    film,
    isSelected,
    isFlipped,
    isLoading,
    frontColor,
    backColor,
  });

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onFlip();
    }
  };

  return (
    <CardWrapper
      data-testid="filmcard-wrapper"
      onClick={() => {
        if (!isLoading) {
          onFlip();
        }
      }}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${accessibleTitle} film card. ${
        isFlipped ? 'Showing details.' : 'Showing poster.'
      } Press Enter or Space to ${isFlipped ? 'show poster' : 'show details'}.`}
      aria-pressed={isFlipped}
      aria-busy={isLoading}
    >
      <CardInner data-testid="filmcard-inner" isFlipped={isFlipped}>
        <FrontFace data-testid="filmcard-frontface" bgColor={frontColor}>
          {isSelected && film ? (
            <FilmCardFront data-testid="filmcard-frontcardfront" film={film} />
          ) : (
            <SelectionSurface banner={banner}>
              <SelectionTitle>{accessibleTitle}</SelectionTitle>
              <FilmButton accessibleTitle onFlip isLoading />
            </SelectionSurface>
          )}
        </FrontFace>

        <BackFace data-testid="filmcard-backface" bgColor={backColor}>
          {film && (
            <FilmCardBack data-testid="filmcard-backcardback" film={film} />
          )}
        </BackFace>
      </CardInner>
    </CardWrapper>
  );
};
