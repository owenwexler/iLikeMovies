import React from 'react';

const movieContext = React.createContext();

const useMovies = () => {
  const context = React.useContext(movieContext);

  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider')
  }

  return context;
}

const MovieProvider = (props) => {
  const [movies, setMovies] = React.useState([]);

  const value = React.useMemo(() => [movies, setMovies], [movies]);

  return (
    <movieContext.Provider value={value} {...props} />
  );
}

export default { MovieProvider, useMovies };