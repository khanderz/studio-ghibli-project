import { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { SnackBar } from '../../shared/components/SnackBar';
import { FilmCard } from './components';
import { useFilmData } from './hooks/useFilmData';
import { FILMS, FilmInfo } from '../../static/films';
import type { Film } from '~/graphql/gen/graphql';

const Home = () => {
  const {
    loadedFilms,
    loadingFilmId,
    errorFilmId,
    errorMessage,
    fetchFilm,
    retryFilm,
    clearError,
  } = useFilmData();

  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedCards, setSelectedCards] = useState<Record<string, boolean>>(
    {},
  );

  const showErrorSnackbar = Boolean(errorFilmId && errorMessage);

  const handleCardFlip = (filmId: FilmInfo['id']) => {
    const isSelected = selectedCards[filmId] || false;
    const loadedFilm: Film | undefined = loadedFilms[filmId];
    const isLoading = loadingFilmId === filmId;
    const hasError = errorFilmId === filmId;

    if (hasError) {
      retryFilm(filmId);
      return;
    }

    if (!isSelected) {
      setSelectedCards((prev) => ({
        ...prev,
        [filmId]: true,
      }));

      if (!loadedFilm && !isLoading) {
        fetchFilm(filmId);
      }
      return;
    }

    if (isLoading || !loadedFilm) {
      return;
    }

    setFlippedCards((prev) => ({
      ...prev,
      [filmId]: !prev[filmId],
    }));
  };

  const handleCloseSnackbar = () => {
    clearError();
  };

  return (
    <Container
      data-testid="home-container"
      maxWidth="xl"
      sx={{
        p: 4,
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        data-testid="home-box"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          data-testid="home-grid-container"
          sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {FILMS.map((filmInfo) => {
            const film = loadedFilms[filmInfo.id] ?? null;
            const isFlipped = flippedCards[filmInfo.id] || false;
            const isSelected = selectedCards[filmInfo.id] || false;
            const isLoading = loadingFilmId === filmInfo.id;

            return (
              <Grid
                item
                data-testid="home-grid-item"
                key={filmInfo.id}
                sx={{
                  padding: 2,
                }}
              >
                <FilmCard
                  baseInfo={filmInfo}
                  film={film}
                  colorKey={filmInfo.cardColorKey}
                  isSelected={isSelected}
                  isFlipped={isFlipped}
                  isLoading={isLoading}
                  onFlip={() => handleCardFlip(filmInfo.id)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <SnackBar
        open={showErrorSnackbar}
        message={errorMessage}
        severity="error"
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default Home;
