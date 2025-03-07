const formatTitleForId = (title: string) => {
  return title
    .replace(/[:'",./!@#$%^&*()+=]/g, '-') // Replace specified characters with '-'
    .replace(/\s+/g, '-') // Replace all spaces with '-'
    .toLowerCase(); // Convert to lowercase
}; 

export {
  formatTitleForId
}
