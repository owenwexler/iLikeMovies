import { atom } from 'jotai';
import { Movie } from '../interfaces/Movie';

const movieAtom = atom<Movie[]>([]);
const watchedUnwatchedFilterAtom = atom<'all' | 'watched' | 'unwatched'>('all');

export {
  movieAtom,
  watchedUnwatchedFilterAtom
}