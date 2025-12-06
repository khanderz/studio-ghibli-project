import { stringArg, nonNull, extendType } from 'nexus';
import { HelloWorld, Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { getHelloWorld } from '~/shared/utils';
import { HttpService } from '~/services/Http/Http.service';

export const TourQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('helloWorld', {
      type: nonNull(HelloWorld),
      resolve: async () => {
        try {
          const helloWorld = getHelloWorld();
          return helloWorld;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    t.field('film', {
      type: Film,
      args: {
        filmId: nonNull(stringArg()),
      },
      resolve: async (_parent, args) => {
        const httpService = new HttpService();
        const apiUrl = `https://ghibliapi.vercel.app/films/${args.filmId}`;

        try {
          const response = await httpService.get({
            endpoint: apiUrl,
          });

          const filmData = response.data;

          // Validate required fields are present
          if (
            !filmData ||
            !filmData.id ||
            !filmData.title ||
            !filmData.image ||
            !filmData.movie_banner ||
            !filmData.description ||
            !filmData.director ||
            !filmData.release_date ||
            !filmData.running_time ||
            !filmData.rt_score
          ) {
            throw new GraphQLError(ErrorMessages.InvalidFilmData, {
              extensions: { code: GQL_ERROR_CODES.BAD_USER_INPUT },
            });
          }

          // Map API response to GraphQL Film type
          // API returns: movie_banner, release_date, running_time, rt_score
          // GraphQL expects: banner, releaseDate, runningTime, rtScore
          // release_date is a year string (e.g., "1988"), create Date from it
          const releaseYear = parseInt(filmData.release_date, 10);
          if (isNaN(releaseYear)) {
            throw new GraphQLError(ErrorMessages.InvalidFilmData, {
              extensions: { code: GQL_ERROR_CODES.BAD_USER_INPUT },
            });
          }
          const releaseDate = new Date(releaseYear, 0, 1); // January 1st of the release year

          const runningTime = parseInt(filmData.running_time, 10);
          const rtScore = parseInt(filmData.rt_score, 10);

          if (isNaN(runningTime) || isNaN(rtScore)) {
            throw new GraphQLError(ErrorMessages.InvalidFilmData, {
              extensions: { code: GQL_ERROR_CODES.BAD_USER_INPUT },
            });
          }

          return {
            id: filmData.id,
            title: filmData.title,
            image: filmData.image,
            banner: filmData.movie_banner,
            description: filmData.description,
            director: filmData.director,
            releaseDate,
            runningTime,
            rtScore,
          };
        } catch (error) {
          // Re-throw GraphQL errors as-is
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Handle axios errors
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { status?: number } };
            // HTTP error response (4xx, 5xx)
            if (axiosError.response?.status === 404) {
              throw new GraphQLError(ErrorMessages.FilmNotFound, {
                extensions: {
                  code: GQL_ERROR_CODES.NOT_FOUND,
                  filmId: args.filmId,
                },
              });
            }
            // Other HTTP errors
            throw new GraphQLError(ErrorMessages.ServerError, {
              extensions: {
                code: GQL_ERROR_CODES.SERVER_ERROR,
                statusCode: axiosError.response?.status,
              },
            });
          }

          // Handle network errors (no response received)
          if (error && typeof error === 'object' && 'request' in error) {
            throw new GraphQLError(ErrorMessages.NetworkError, {
              extensions: { code: GQL_ERROR_CODES.NETWORK_ERROR },
            });
          }

          // Generic error for unexpected cases
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});
