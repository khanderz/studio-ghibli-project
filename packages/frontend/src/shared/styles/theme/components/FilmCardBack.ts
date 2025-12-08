import { Box, Typography, styled } from '@mui/material';

const BackCardContainer = styled(Box)(() => ({
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

const RtScoreImage = styled('img')({
  width: '40px',
  height: '40px',
  objectFit: 'cover',
});

export {
  BackCardContainer,
  BannerContainer,
  BannerImage,
  ContentContainer,
  InfoRow,
  Label,
  Value,
  Description,
  RtScoreImage,
};
