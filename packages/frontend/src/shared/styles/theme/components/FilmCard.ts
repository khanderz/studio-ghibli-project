import { Box, styled, type Theme } from '@mui/material';

const CARD_BORDER_RADIUS = 16;
const CARD_WIDTH = 290;
const CARD_HEIGHT = 368;

const CardWrapper = styled(Box)(({ theme }: Theme) => ({
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  borderRadius: CARD_BORDER_RADIUS,
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  border: `4px solid ${theme.palette.common.white}`,
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

export {
  CardWrapper,
  CardInner,
  FrontFace,
  BackFace,
  SelectionSurface,
  SelectionTitle,
};
