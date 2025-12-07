declare module '@mui/material/styles' {
  interface CardPalette {
    totoro: string;
    spiritedAway: string;
    mononoke: string;
    howl: string;
  }

  interface Palette {
    card: CardPalette;
  }

  interface PaletteOptions {
    card?: Partial<CardPalette>;
  }

  interface ZIndex {
    min: number;
    default: number;
  }
}

declare module '@mui/material/Button' {
  export interface ButtonPropsVariantOverrides {}
}

declare module '@mui/material/Typography' {
  export interface TypographyPropsVariantOverrides {}
}
