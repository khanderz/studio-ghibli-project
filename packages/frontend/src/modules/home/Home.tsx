import { useState } from 'react';
import { Box, Container, Grid, Snackbar, Alert } from '@mui/material';
import { FilmButton } from './components/FilmButton';
import { FilmCard } from './components/FilmCard';
import { useFilmData } from './hooks/useFilmData';
import type { Film } from '~/graphql/gen/graphql';

interface FilmInfo {
  id: string;
  name: string;
}

const FILMS: FilmInfo[] = [
  { id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8', name: 'Porco Rosso' },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    name: "Kiki's Delivery Service",
  },
  { id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa', name: "Howl's Moving Castle" },
  { id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49', name: 'My Neighbor Totoro' },
];

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
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  const handleFilmClick = (filmId: string) => {
    fetchFilm(filmId);
  };

  const handleCardFlip = (filmId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [filmId]: !prev[filmId],
    }));
  };

  const handleRetry = (filmId: string) => {
    retryFilm(filmId);
  };

  // Show snackbar when error occurs
  if (errorFilmId && errorMessage && !showErrorSnackbar) {
    setShowErrorSnackbar(true);
  }

  const handleCloseSnackbar = () => {
    setShowErrorSnackbar(false);
    clearError();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Grid container spacing={3}>
          {FILMS.map((film) => {
            const loadedFilm = loadedFilms[film.id];
            const isFlipped = flippedCards[film.id] || false;
            const hasError = errorFilmId === film.id;

            return (
              <Grid item xs={12} sm={6} key={film.id}>
                {hasError ? (
                  <FilmButton
                    filmName={film.name}
                    onClick={() => handleRetry(film.id)}
                    isLoading={loadingFilmId === film.id}
                    disabled={loadingFilmId !== null}
                  />
                ) : loadedFilm ? (
                  <FilmCard
                    film={loadedFilm}
                    isFlipped={isFlipped}
                    onFlip={() => handleCardFlip(film.id)}
                  />
                ) : (
                  <FilmButton
                    filmName={film.name}
                    onClick={() => handleFilmClick(film.id)}
                    isLoading={loadingFilmId === film.id}
                    disabled={loadingFilmId !== null}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
