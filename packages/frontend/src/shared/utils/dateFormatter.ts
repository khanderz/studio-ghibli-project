import type { Film } from '~/graphql/gen/graphql';

export function formatDate(date: Film['releaseDate']): Film['releaseDate'] {
  if (!date) {
    return 'N/A';
  }
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return 'N/A';
  }

  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
