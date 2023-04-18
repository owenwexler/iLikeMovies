import axios from 'axios';
import { IMovie } from '../interfaces/IMovie';

interface IMovieAPIResponse {
  data: IMovie[]
}

const routes = {
  getMovies: 'api/movies',
  postMovie: 'api/movie',
  toggleMovieWatched: 'api/togglemoviewatched',
  deleteMovie: 'api/deletemovie'
}

const {
  getMovies,
  postMovie,
  toggleMovieWatched,
  deleteMovie
} = routes;

const { VITE_API_URL, VITE_API_KEY } = import.meta.env;

const getMoviesFromAPI = async () => {
  try {
    const { data } = await axios.get<IMovieAPIResponse>(
      `${VITE_API_URL}/${getMovies}`,
      {
        params: {},
        headers: {
          apikey: VITE_API_KEY
        },
      }
    );

    return data;
  } catch (err) {
    return err;
  }
}

const postMovieToAPI = async (movie: string) => {
  try {
    const { data } = await axios.post<IMovieAPIResponse>(
      `${VITE_API_URL}/${postMovie}`,
      {
        params: {
          movie
        },
        headers: {
          apikey: VITE_API_KEY
        },
      }
    );

    return data;
  } catch (err) {
    return err;
  }
}

const toggleMovieToAPI = async (movie: string) => {
  try {
    const { data } = await axios.put<IMovieAPIResponse>(
      `${VITE_API_URL}/${toggleMovieWatched}`,
      {
        params: {
          movie
        },
        headers: {
          apikey: VITE_API_KEY
        },
      }
    );

    return data;
  } catch (err) {
    return err;
  }
}

const deleteMovieToAPI = async (movie: string) => {
  try {
    const { data } = await axios.delete<IMovieAPIResponse>(
      `${VITE_API_URL}/${deleteMovie}`,
      {
        params: {
          movie
        },
        headers: {
          apikey: VITE_API_KEY
        },
      }
    );

    return data;
  } catch (err) {
    return err;
  }
}

export {
  getMoviesFromAPI,
  postMovieToAPI,
  toggleMovieToAPI,
  deleteMovieToAPI
}