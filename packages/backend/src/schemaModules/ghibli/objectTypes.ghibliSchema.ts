import { objectType } from 'nexus';

export const HelloWorld = objectType({
  name: 'HelloWorld',
  definition(t) {
    t.string('message');
  },
});

export const Film = objectType({
  name: 'Film',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('title');
    t.nonNull.string('image');
    t.nonNull.string('movie_banner');
    t.nonNull.string('description');
    t.nonNull.string('director');
    t.nonNull.field('release_date', { type: 'Date' });
    t.nonNull.int('running_time');
    t.nonNull.int('rt_score');
  },
});
