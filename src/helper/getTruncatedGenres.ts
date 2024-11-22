const getTruncatedGenres = (inputGenreString: string) => {
  const genresArr = inputGenreString.split(',');

  if (genresArr.length > 3) {
    return inputGenreString;
  }

  return genresArr.slice(0, 2).join(', ');
}

export {
  getTruncatedGenres
}
