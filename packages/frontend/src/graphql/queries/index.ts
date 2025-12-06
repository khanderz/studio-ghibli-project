import { gql } from '~/graphql/gen';

export const GET_HELLO_WORLD = gql(`
  query GetHelloWorld {
    helloWorld {
      message
    }
  }
`);

export const GET_FILM = gql(`
  query GetFilm($filmId: String!) {
    film(filmId: $filmId) {
      id
      title
      image
      banner
      description
      director
      releaseDate
      runningTime
      rtScore
    }
  }
`);
