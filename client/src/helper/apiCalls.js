import { useAxios } from "../../../hooks/useAxios";

const routes = {
  getMovies: '/api/movies',
  postMovie: '/api/movie',
  toggleMovieWatched: '/api/togglemoviewatched',
  deleteMovie: '/api/deletemovie'
}

const {
  getMovies,
  postMovie,
  toggleMovieWatched,
  deleteMovie
} = routes;

// returning in the format expected by the current (legacy) frontend for now, will change to only returning response.data when the frontend is refactored a bit
const formatForLegacyFrontend = (response) => {
  const { data } = response;
  return data.userMovieList.map(movie => data[movie]);
}

const getMoviesFromAPI = async () => {
  try {
    const response = await useAxios({
      route: getMovies,
      method: 'GET',
      params: {}
    });

    // return response.data;

    return formatForLegacyFrontend(response);
  } catch (err) {
    return err;
  }
}

const postMovieToAPI = async (movie) => {
  try {
    const response = await useAxios({
      route: postMovie,
      method: 'POST',
      params: {
        movie
      }
    });

    // return response.data;

    return formatForLegacyFrontend(response);
  } catch (err) {
    return err;
  }
}

const toggleMovieToAPI = async (movie) => {
  try {
    const response = await useAxios({
      route: toggleMovieWatched,
      method: 'PUT',
      params: {
        movie
      }
    });

    // return response.data;

    return formatForLegacyFrontend(response);
  } catch (err) {
    return err;
  }
}

const deleteMovieToAPI = async (movie) => {
  try {
    const response = await useAxios({
      route: deleteMovie,
      method: 'DELETE',
      params: {
        movie
      }
    });

    // return response.data;

    return formatForLegacyFrontend(response);
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