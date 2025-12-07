import { Box, Typography } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';
import type { Film } from '~/graphql/gen/graphql';

const CardContainer = styled(Box)(({ theme }: Theme) => ({
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

const TitleContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.common.white,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const FilmCardFront = ({ film }: Film) => {
  return (
    <CardContainer>
      <ImageContainer>
        <FilmImage src={film.image} alt={film.title} />
      </ImageContainer>
      <TitleContainer>
        <Typography variant="h6" component="h2" fontWeight={600}>
          {film.title}
        </Typography>
      </TitleContainer>
    </CardContainer>
  );
};
