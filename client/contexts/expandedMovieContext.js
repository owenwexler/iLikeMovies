import React from 'react';

/**
 * Provides the ID used in the expanded movie information modal
 */

const expandedMovieContext = React.createContext();

const useExpandedMovieId = () => {
  const context = React.useContext(expandedMovieContext);

  if (!context) {
    throw new Error('useExpandedMovieId must be used within a MovieProvider')
  }

  return context;
}

const ExpandedMovieIdProvider = (props) => {
  const [expandedMovieId, setExpandedMovieId] = useState(0);

  const value = React.useMemo(() => [expandedMovieId, setExpandedMovieId], [expandedMovieId]);

  return <expandedMovieContext.Provider value={value} {...props} />
}

export default { ExpandedMovieIdProvider, useExpandedMovieId };






