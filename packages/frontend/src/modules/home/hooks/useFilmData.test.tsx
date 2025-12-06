import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { useFilmData } from './useFilmData';

describe('useFilmData', () => {
  it('should initialize with empty state', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider>{children}</MockedProvider>
    );

    const { result } = renderHook(() => useFilmData(), { wrapper });

    expect(result.current.loadedFilms).toEqual({});
    expect(result.current.loadingFilmId).toBeNull();
    expect(result.current.errorFilmId).toBeNull();
    expect(result.current.errorMessage).toBeNull();
  });

  it('should return correct functions', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider>{children}</MockedProvider>
    );

    const { result } = renderHook(() => useFilmData(), { wrapper });

    expect(typeof result.current.fetchFilm).toBe('function');
    expect(typeof result.current.retryFilm).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('should clear error when clearError is called', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MockedProvider>{children}</MockedProvider>
    );

    const { result } = renderHook(() => useFilmData(), { wrapper });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.errorMessage).toBeNull();
  });
});
