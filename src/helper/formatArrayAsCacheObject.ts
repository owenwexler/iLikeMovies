
/**
 * @Function formatArrayAsCacheObject
 *
 * Generalized function that takes an array of objects with "id" properties, converts it into a key-value pair object with each item's ID as the key, then returns the key value pair object.  This is for caching arrays of objects returned from the database to improve performance (by allowing search by ID in O(1) time).  All objects in array must have an "id" property for this function to work otherwise an error is returned.
 *
 * We use this function A LOT to convert arrays of objects into key-value objects with ID as key so we can search by ID in O(1) time.  It is arguably one of the most important helper functions in our entire codebase.
 *
 * IMPORTANT NOTE: all fields in the array MUST have an "title" property, if *even one* field does not have this, the function will return an error
 *
 * @param {IDynamicObjectWithID[]} rows // An array of objects, likely returned from the database, all with an id property
 *
 * @returns {IDynamicObject} // a key value object with each object, with the id as the key and the object itself as the value, that can be searched in O(1) time.  If any object in the array has no id field, the object returned is { error: 'All rows must have valid ID field' }
 *
 * @example
 * const rows = [{ id: 'askdjfij', foo: 'bar', baz: 'yo' }, { id: 'iguhwiorfj', bar: 'foo', yo: 'baz' }];
 * console.log(formatArrayAsCacheObject(rows));
 * {
 *  'askdjfij': { id: 'askdjfij', foo: 'bar', baz: 'yo' },
 *  'iguhwiorfj': { id: 'iguhwiorfj', bar: 'foo', yo: 'baz' }
 * }
 * NOTE: this funtion is adapted from the DANCENAV codebase for iLikeMovies and uses a title field instead of ID because this is how movies are identified in iLikeMovies
 */

const formatArrayAsCacheObject = (rows: { [key: string]: unknown; title: string; }[]) => {
  if (!rows) { return {} }

  const result: { [key: string]: unknown } = {};
  let error = false;

  for (const row of rows) {
    if(!row.title) {
      error = true;
    }

    const key = row.title.toLowerCase();

    result[key] = row;
  }

  return error ? { error: 'All rows must have valid ID field' } : result;
}

export {
  formatArrayAsCacheObject
}
