import { css } from '@mui/material';
import { theme } from '~/shared/styles/theme';

export const globalStyles = css`
  html,
  body,
  #root {
    height: 100%;
    display: flex;
    margin: 0;
    padding: 0;
  }

  body {
    background-image: url('/Background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: ${theme.typography.fontFamily};
    color: ${theme.palette.text.primary || '#000'};
  }
`;
