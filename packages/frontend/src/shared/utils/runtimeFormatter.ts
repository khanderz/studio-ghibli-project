import type { Film } from '~/graphql/gen/graphql';

export function formatRuntime(
  minutes: Film['runningTime'],
): Film['runningTime'] {
  if (!minutes) {
    return 'N/A';
  }
  return `${minutes} min`;
}
