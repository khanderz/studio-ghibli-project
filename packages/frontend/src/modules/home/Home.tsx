import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, Container, Grid } from '@mui/material';
import { FilmButton } from './components/FilmButton';
import { FilmCard } from './components/FilmCard';
import { GET_FILM } from '~/graphql/queries';
import type { Film, GetFilmQuery } from '~/graphql/gen/graphql';

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
  const [loadingFilmId, setLoadingFilmId] = useState<string | null>(null);
  const [loadedFilms, setLoadedFilms] = useState<Record<string, Film>>({});
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const [getFilm] = useLazyQuery<GetFilmQuery>(GET_FILM, {
    onCompleted: (data) => {
      if (data.film) {
        setLoadedFilms((prev) => ({
          ...prev,
          [data.film!.id]: data.film!,
        }));
        setLoadingFilmId(null);
      }
    },
    onError: () => {
      setLoadingFilmId(null);
      // Error handling will be improved in task 5.5
    },
  });

  const handleFilmClick = (filmId: string) => {
    // If film is already loaded, don't fetch again
    if (loadedFilms[filmId]) {
      return;
    }

    setLoadingFilmId(filmId);
    getFilm({ variables: { filmId } });
  };

  const handleCardFlip = (filmId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [filmId]: !prev[filmId],
    }));
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

            return (
              <Grid item xs={12} sm={6} key={film.id}>
                {loadedFilm ? (
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
    </Container>
  );
};

export default Home;
