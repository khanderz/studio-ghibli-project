import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Film } from '~/graphql/gen/graphql';
import tomatoIcon from '../../../../public/tomato.png';

const CardContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

const BannerContainer = styled(Box)({
  width: '100%',
  height: '115px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const BannerImage = styled('img')({
  width: '100%',
  height: '115px',
  objectFit: 'cover',
});

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  backgroundColor: theme.palette.common.white,
}));

const InfoRow = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}));

const Value = styled(Typography)({
  fontSize: '12px',
  fontWeight: 700,
  fontStyle: 'italic',
});

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  marginBottom: theme.spacing(1),
}));

function formatDate(date: Film['releaseDate']): Film['releaseDate'] {
  if (!date) {
    return 'N/A';
  }
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return 'N/A';
  }

  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
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

const RtScoreImage = styled('img')({
  width: '40px',
  height: '40px',
  objectFit: 'cover',
});

export const FilmCardBack = ({ film }: Film) => {
  return (
    <CardContainer>
      <BannerContainer>
        <BannerImage src={film.banner} alt={`${film.title} banner`} />
      </BannerContainer>
      <ContentContainer>
        <Description variant="body2">{film.description}</Description>
        <InfoRow>
          <Label>Runtime:</Label>
          <Value>{formatRuntime(film.runningTime)}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Director:</Label>
          <Value>{film.director}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Release Date:</Label>
          <Value>{formatDate(film.releaseDate)}</Value>
        </InfoRow>

        <InfoRow
          sx={{
            marginTop: 'auto',
          }}
        >
          <RtScoreImage src={tomatoIcon} />
          <Typography
            sx={{
              fontSize: '40px',
              fontWeight: 600,
              marginLeft: 2,
            }}
          >
            {formatRtScore(film.rtScore)}
          </Typography>
        </InfoRow>
      </ContentContainer>
    </CardContainer>
  );
};
