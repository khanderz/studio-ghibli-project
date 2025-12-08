import {
  Container,
  Box,
  Grid,
  Typography,
  styled,
  type Theme,
} from '@mui/material';

const HomeContainer = styled(Container)(({ theme }: Theme) => ({
  padding: theme.spacing(4),
  display: 'flex',
  height: '100%',
  width: '100%',
}));

const HomeBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 24, // 3 * 8px
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}));

const HomeGridParent = styled(Grid)(() => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const HeaderGridItem = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const FilmsGridContainer = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'nowrap',
}));

const FilmGridItem = styled(Grid)(() => ({
  padding: 16, // 2 * 8px
}));

const HomeTitle = styled(Typography)(() => ({
  fontSize: '4rem',
  fontWeight: 600,
}));

const HomeSubtitle = styled(Typography)(({ theme }: Theme) => ({
  fontSize: '2rem',
  fontWeight: 200,
  marginBottom: theme.spacing(4),
}));

export {
  HomeContainer,
  HomeBox,
  HomeGridParent,
  HeaderGridItem,
  FilmsGridContainer,
  FilmGridItem,
  HomeTitle,
  HomeSubtitle,
};
