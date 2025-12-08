import { Box, styled } from '@mui/material';

const CardContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

const ImageContainer = styled(Box)({
  width: '100%',
  flex: 1,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
});

const FilmImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export { CardContainer, ImageContainer, FilmImage };
