import { createTheme, ThemeOptions } from '@mui/material';
import { typography } from './typography';
import { palette, CardColorKey } from './palette';
import { components } from './components';

const themeOptions: ThemeOptions = {
  typography,
  palette,
};

export const theme = createTheme({
  ...themeOptions,
  components: {
    ...components,
  },
});

export type { CardColorKey };
