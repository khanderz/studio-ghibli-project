import { useQuery, useLazyQuery } from '@apollo/client';
import { Box, Typography, CircularProgress } from '@mui/material';
import { GET_HELLO_WORLD, GET_FILM } from '~/graphql/queries';
import type { GetFilmQueryVariables } from '~/graphql/gen/graphql';

const Home = () => {
  const { data, loading, error } = useQuery(GET_HELLO_WORLD);

  // Temporary test of GET_FILM query - can be removed later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [getFilm, { data: filmData, loading: filmLoading, error: filmError }] =
    useLazyQuery(GET_FILM);

  // Test query with a valid film ID (My Neighbor Totoro)
  // Uncomment to test: getFilm({ variables: { filmId: '58611129-2dbc-4a81-a72f-77ddfc1b1b49' } });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="16px">
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box
      padding="16px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
    >
      <Typography variant="h2" component="h1" gutterBottom>
        {data?.helloWorld?.message || 'Hello World'}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        This message is fetched from the GraphQL backend!
      </Typography>
    </Box>
  );
};

export default Home;
