import { API_ROOT, HEADERS, UNDEFINED } from '../constants';

// enum for center components

export const CenterState = {
  BLANK: 0,
  ACTIVE: 1,
  CREATE: 2,
  JOIN: 3,
  SPARK: 4,
}

// helper functions

export function exists(obj) {
  return typeof obj !== UNDEFINED && obj !== null;
}
