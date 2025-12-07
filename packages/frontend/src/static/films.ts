import type { Film } from '~/graphql/gen/graphql';
import type { CardColorKey } from '../../shared/styles/theme';

export interface FilmInfo {
  id: Film['id'];
  title: Film['title'];
  cardColorKey: CardColorKey;
}

export const FILMS: FilmInfo[] = [
  {
    id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
    title: 'Porco Rosso',
    cardColorKey: 'mononoke',
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    title: "Kiki's Delivery Service",
    cardColorKey: 'spiritedAway',
  },
  {
    id: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
    title: "Howl's Moving Castle",
    cardColorKey: 'howl',
  },
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    title: 'My Neighbor Totoro',
    cardColorKey: 'totoro',
  },
];
