import type { FilterUnionType } from "../typedefs/FilterUnionType";

const getTypedFilter = (filter: string): FilterUnionType => {
  return filter && ['all', 'watched', 'unwatched'].includes(filter) ? filter : 'all';
}

export {
  getTypedFilter
}
