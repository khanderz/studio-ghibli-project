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
    t.nonNull.string('banner');
    t.nonNull.string('description');
    t.nonNull.string('director');
    t.nonNull.field('releaseDate', { type: 'Date' });
    t.nonNull.int('runningTime');
    t.nonNull.int('rtScore');
  },
});
