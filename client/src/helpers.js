import { UNDEFINED, MAX_INSPO_CARD_LENGTH } from './constants';

// enum for center components

export const CenterComponent = {
  BLANK: 0,
  ACTIVE: 1,
  CREATE: 2,
  JOIN: 3,
  SPARK: 4,
}

export const RightbarComponent = {
  LIST: 0,
  DETAILS: 1,
  INFO: 2,
}

// helper functions

export function exists(obj) {
  return typeof obj !== UNDEFINED && obj !== null;
}

export function getTimeAMPM(time) {
  let isPM = time.getHours() / 12 === 1;
  let hours = time.getHours() % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${time.getMinutes()} ${isPM ? "PM" : "AM"}`;
}

export function clipMessage(message) {
  if (message.length <= MAX_INSPO_CARD_LENGTH) return message;
  return message.slice(0, MAX_INSPO_CARD_LENGTH) + "...";
}
