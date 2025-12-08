import { useTheme, type Theme } from '@mui/material/styles';
import { FilmCardFront, FilmCardBack, FilmButton } from '.';
import type { Film } from '~/graphql/gen/graphql';
import type { CardColorKey } from '../../shared/styles/theme';
import { FilmInfo } from '../../../static/films';
import {
  CardWrapper,
  CardInner,
  FrontFace,
  BackFace,
  SelectionSurface,
  SelectionTitle,
} from '../../../shared/styles/theme/components';

interface FilmCardProps {
  baseInfo: FilmInfo;
  film: Film | null;
  colorKey: CardColorKey;
  isSelected: boolean;
  isFlipped: boolean;
  isLoading: boolean;
  onFlip: () => void;
}

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

  const handleMouseEnter = () => {
    if (!isSelected || !film || isLoading) {
      return;
    }
    if (!isFlipped) {
      onFlip();
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected || !film || isLoading) {
      return;
    }
    if (isFlipped) {
      onFlip();
    }
  };

  return (
    <CardWrapper
      data-testid="filmcard-wrapper"
      role="button"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
              <FilmButton
                accessibleTitle={accessibleTitle}
                onFlip={onFlip}
                isLoading={isLoading}
              />
            </SelectionSurface>
          )}
        </FrontFace>

        <BackFace data-testid="filmcard-backface" bgColor={backColor}>
          {isFlipped && isSelected && film && (
            <FilmCardBack data-testid="filmcard-backcardback" film={film} />
          )}
        </BackFace>
      </CardInner>
    </CardWrapper>
  );
};
