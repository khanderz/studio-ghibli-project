import {
  CardContainer,
  ImageContainer,
  FilmImage,
} from '../../../shared/styles/theme/components';
import type { Film } from '~/graphql/gen/graphql';

export const FilmCardFront = ({ film }: Film) => {
  return (
    <CardContainer>
      <ImageContainer>
        <FilmImage src={film.image} alt={film.title} />
      </ImageContainer>
    </CardContainer>
  );
};
