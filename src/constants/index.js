export const UNDEFINED = "undefined";
export const URL_ROOT = 'https://whim-chat.herokuapp.com'
export const API_ROOT = 'https://intense-coast-16296.herokuapp.com/api/v1';
export const API_WS_ROOT = 'wss://intense-coast-16296.herokuapp.com/api/v1/cable';
//export const API_ROOT = 'http://localhost:3000/api/v1';
//export const API_WS_ROOT = 'ws://localhost:3000/api/v1/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// routes
export const PATH_ROOT = "/";
export const PATH_BOARD = "/board";
export const PATH_INVITE = "/invite/:hash";
export const PATH_INVALID_INVITE = "/invalid";
export const PATH_THREADS = "/threads";
export const PATH_SESSION = "/session";
export const PATH_CONFIRMATION = "/confirmation/:uuid";
export const PATH_LOGIN = "/login";
export const PATH_SIGNUP = "/signup";

// etc
export const MAX_INSPO_CARD_LENGTH = 120;
export const MAX_MSG_LENGTH = 2000;

// gravatar
export const PATH_GRAVATAR = "https://www.gravatar.com/avatar";
