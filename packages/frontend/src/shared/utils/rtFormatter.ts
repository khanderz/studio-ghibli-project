import type { Film } from '~/graphql/gen/graphql';

export function formatRtScore(score: Film['rtScore']): Film['rtScore'] {
  if (!score) {
    return 'N/A';
  }
  return `${score}%`;
}
