const formatUrlTitle = (urlTitle: string) => {
  return urlTitle.split('%20').join(' ');
}

export {
  formatUrlTitle
}
