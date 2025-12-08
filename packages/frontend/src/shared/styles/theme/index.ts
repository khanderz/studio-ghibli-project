import { createTheme, ThemeOptions } from '@mui/material';
import { typography } from './typography';
import { palette, CardColorKey } from './palette';

const themeOptions: ThemeOptions = {
  typography,
  palette,
};

export const theme = createTheme({
  ...themeOptions,
});

export type { CardColorKey };
