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
  transform: 'rotateY(180deg)',
}));

const BannerContainer = styled(Box)({
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const BannerImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  overflowY: 'auto',
  backgroundColor: theme.palette.common.white,
}));

const InfoRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const Value = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
});

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

function formatDate(date: Film['releaseDate']): Film['releaseDate'] {
  if (!date) {
    return 'N/A';
  }
  if (typeof date === 'number') {
    const d = new Date(date);
    return d.getFullYear().toString();
  }
  if (date instanceof Date) {
    return date.getFullYear().toString();
  }
  return String(date);
}

function formatRuntime(minutes: Film['runningTime']): Film['runningTime'] {
  if (!minutes) {
    return 'N/A';
  }
  return `${minutes} min`;
}

function formatRtScore(score: Film['rtScore']): Film['rtScore'] {
  if (!score) {
    return 'N/A';
  }
  return `${score}%`;
}

export const FilmCardBack = ({ film }: Film) => {
  return (
    <CardContainer>
      <BannerContainer>
        <BannerImage src={film.banner} alt={`${film.title} banner`} />
      </BannerContainer>
      <ContentContainer>
        <Description variant="body2">{film.description}</Description>
        <InfoRow>
          <Label>Director</Label>
          <Value>{film.director}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Release Date</Label>
          <Value>{formatDate(film.releaseDate)}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Runtime</Label>
          <Value>{formatRuntime(film.runningTime)}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Rotten Tomatoes Score</Label>
          <Value>{formatRtScore(film.rtScore)}</Value>
        </InfoRow>
      </ContentContainer>
    </CardContainer>
  );
};
