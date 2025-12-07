import { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { SnackBar } from '../../shared/components/SnackBar';
import { FilmButton, FilmCard } from './components';
import { useFilmData } from './hooks/useFilmData';
import type { Film } from '~/graphql/gen/graphql';
import { CardColorKey } from '@mui/material/styles';

interface FilmInfo {
  id: Film['id'];
  name: Film['title'];
  cardColorKey: CardColorKey;
}

const FILMS: FilmInfo[] = [
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    name: 'Porco Rosso',
    cardColorKey: 'mononoke',
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    name: "Kiki's Delivery Service",
    cardColorKey: 'spiritedAway',
  },
  {
    id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
    name: "Howl's Moving Castle",
    cardColorKey: 'howl',
  },
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    name: 'My Neighbor Totoro',
    cardColorKey: 'totoro',
  },
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
  const showErrorSnackbar = Boolean(errorFilmId && errorMessage);

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

  const handleCloseSnackbar = () => {
    clearError();
  };

  const renderFilmTile = (film: FilmInfo) => {
    const loadedFilm = loadedFilms[film.id];
    const isFlipped = flippedCards[film.id] || false;
    const hasError = errorFilmId === film.id;
    const isLoading = loadingFilmId === film.id;
    const isAnyLoading = loadingFilmId !== null;

    if (hasError) {
      return (
        <FilmButton
          filmName={film.name}
          onClick={() => handleRetry(film.id)}
          isLoading={isLoading}
          disabled={isAnyLoading}
          isError
        />
      );
    }

    if (loadedFilm) {
      return (
        <FilmCard
          film={loadedFilm}
          colorKey={film.cardColorKey}
          isFlipped={isFlipped}
          onFlip={() => handleCardFlip(film.id)}
        />
      );
    }

    return (
      <FilmButton
        filmName={film.name}
        onClick={() => handleFilmClick(film.id)}
        isLoading={isLoading}
        disabled={isAnyLoading}
      />
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
          {FILMS.map((film) => (
            <Grid item xs={12} sm={6} key={film.id}>
              {renderFilmTile(film)}
            </Grid>
          ))}
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
