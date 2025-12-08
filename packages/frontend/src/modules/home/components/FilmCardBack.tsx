import { Typography } from '@mui/material';
import type { Film } from '~/graphql/gen/graphql';
import tomatoIcon from '../../../../public/tomato.png';
import {
  BackCardContainer,
  BannerContainer,
  BannerImage,
  ContentContainer,
  InfoRow,
  Label,
  Value,
  Description,
  RtScoreImage,
} from '../../../shared/styles/theme/components';
import {
  formatDate,
  formatRuntime,
  formatRtScore,
} from '../../../shared/utils/dateFormatter';

export const FilmCardBack = ({ film }: Film) => {
  return (
    <BackCardContainer>
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
    </BackCardContainer>
  );
};
