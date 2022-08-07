import { IS_AUTH_USER, IS_AUTH_USER_SUCCESS, API_ERROR } from "./actionTypes";

export const isAuthUser = (history, location) => {
  return {
    type: IS_AUTH_USER,
    payload: { history, location },
  };
};
export const isAuthUserSuccess = (msg) => {
  return {
    type: IS_AUTH_USER_SUCCESS,
    payload: msg,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
