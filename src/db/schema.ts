import { pgTable, text, varchar, boolean, primaryKey, unique } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel } from 'drizzle-orm';
import { index } from 'drizzle-orm/mysql-core';

export const users = pgTable('users', {
  id: varchar('user_id', { length: 35 }).notNull().unique().primaryKey(),
  name: varchar('user_name', { length: 50 }).notNull(),
}, (table) => ({
  userIdIndex: index('idx_user_ids').on(table.id),
}));

export type User = InferSelectModel<typeof users>;

export const userMovies = pgTable('user_movies', {
  id: varchar('user_movie_id', { length: 35 }).notNull().unique().primaryKey(),
  movieName: text('movie_name').notNull(),
  imdbId: varchar('imdb_id', { length: 50 }),
  userId: varchar('user_id', { length: 50 }),
  watched: boolean('watched'),
}, (table) => ({
  movieIdIndex: index('idx_user_movie_ids').on(table.id),
  movieNameIndex: index('idx_user_movie_names').on(table.movieName),
  movieImdbIdIndex: index('idx_user_movie_imdb_ids').on(table.imdbId),
}));
console.log(userMovies);

export type UserMovie = InferSelectModel<typeof userMovies>;

// Define relationships between tables
export const userRelations = relations(users, ({ one }) => ({
  userMovies: one(userMovies, {
    fields: [userMovies.userId],
    references: [users.userId],
  }),
}));
