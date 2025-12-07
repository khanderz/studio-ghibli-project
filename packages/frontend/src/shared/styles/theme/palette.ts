import type { PaletteOptions, Theme } from '@mui/material/styles';

export type CardColorKey = keyof Theme['palette']['card'];

export const palette: PaletteOptions = {
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
  primary: {
    main: '#1E88E5',
    light: '#64B5F6',
    dark: '#1976D2',
  },
  card: {
    totoro: '#d79a68',
    spiritedAway: '#c24646',
    mononoke: '#279094',
    howl: '#3e6cac',
  },
  text: {
    primary: '#000000',
    secondary: 'rgba(0,0,0,0.7)',
  },
  custom: {},
};
