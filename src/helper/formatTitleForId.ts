const formatTitleForId = (title: string) => {
  return title.split(' ').join('').replace(/(')/, '');
}

export {
  formatTitleForId
}
