import { useState, useCallback, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_FILM } from '~/graphql/queries';
import type { Film, GetFilmQuery } from '~/graphql/gen/graphql';

interface CachedFilm {
  data: Film;
  timestamp: number;
}

interface UseFilmDataReturn {
  loadedFilms: Record<string, Film>;
  loadingFilmId: string | null;
  errorFilmId: string | null;
  errorMessage: string | null;
  fetchFilm: (filmId: string) => void;
  retryFilm: (filmId: string) => void;
  clearError: () => void;
}

const CACHE_EXPIRATION_MS = 7 * 60 * 1000; // 7 minutes

export const useFilmData = (): UseFilmDataReturn => {
  const [loadedFilms, setLoadedFilms] = useState<Record<string, Film>>({});
  const [loadingFilmId, setLoadingFilmId] = useState<string | null>(null);
  const [errorFilmId, setErrorFilmId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cacheRef = useRef<Record<string, CachedFilm>>({});

  const [getFilm] = useLazyQuery<GetFilmQuery>(GET_FILM, {
    onCompleted: (data) => {
      if (data.film) {
        const filmId = data.film.id;
        setLoadedFilms((prev) => ({
          ...prev,
          [filmId]: data.film!,
        }));
        cacheRef.current[filmId] = {
          data: data.film,
          timestamp: Date.now(),
        };
        setLoadingFilmId(null);
        setErrorFilmId(null);
        setErrorMessage(null);
      }
    },
    onError: (error) => {
      setLoadingFilmId(null);
      setErrorFilmId(null);
      setErrorMessage(error.message || 'Failed to fetch film data');
    },
  });

  const isCacheValid = useCallback((filmId: string): boolean => {
    const cached = cacheRef.current[filmId];
    if (!cached) return false;
    const isExpired = Date.now() - cached.timestamp > CACHE_EXPIRATION_MS;
    return !isExpired;
  }, []);

  const fetchFilm = useCallback(
    (filmId: string) => {
      // If film is in memory state, don't fetch again
      if (loadedFilms[filmId]) {
        return;
      }

      // If cache is still valid, use cached data
      if (isCacheValid(filmId)) {
        const cached = cacheRef.current[filmId];
        setLoadedFilms((prev) => ({
          ...prev,
          [filmId]: cached.data,
        }));
        return;
      }

      setLoadingFilmId(filmId);
      setErrorFilmId(null);
      setErrorMessage(null);
      getFilm({ variables: { filmId } });
    },
    [loadedFilms, getFilm, isCacheValid],
  );

  const retryFilm = useCallback(
    (filmId: string) => {
      // Clear from loaded films and cache to force refetch
      setLoadedFilms((prev) => {
        const newState = { ...prev };
        delete newState[filmId];
        return newState;
      });
      delete cacheRef.current[filmId];

      setLoadingFilmId(filmId);
      setErrorFilmId(null);
      setErrorMessage(null);
      getFilm({ variables: { filmId } });
    },
    [getFilm],
  );

  const clearError = useCallback(() => {
    setErrorFilmId(null);
    setErrorMessage(null);
  }, []);

  return {
    loadedFilms,
    loadingFilmId,
    errorFilmId,
    errorMessage,
    fetchFilm,
    retryFilm,
    clearError,
  };
};
