import { atom } from 'jotai';
import { IMovie } from '../interfaces/IMovie';

const movieAtom = atom<IMovie[]>([]);
const watchedUnwatchedFilterAtom = atom<'all' | 'watched' | 'unwatched'>('all');

export {
  movieAtom,
  watchedUnwatchedFilterAtom
}