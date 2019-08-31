import { API_ROOT, HEADERS, UNDEFINED } from '../constants';

// helper functions

export function exists(obj) {
  return typeof obj !== UNDEFINED && obj !== null;
}
