const setup = (movies=[]) => {
  const mockUseMovies = jest.fn().mockReturnValue([movies, jest.fn()]);
  movieContext.useMovies = mockUseMovies;
  return shallow(<MovieList />)
};