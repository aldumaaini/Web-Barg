import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  NEW_PASSWORD,
  NEW_PASSWORD_ERROR,
  NEW_PASSWORD_SUCCESS,
} from "./actionTypes";

export const userForgetPassword = (user, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
  };
};

export const userForgetPasswordSuccess = (message) => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const userForgetPasswordError = (message) => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  };
};

export const userNewPassword = (user, history) => {
  return {
    type: NEW_PASSWORD,
    payload: { user, history },
  };
};

export const userNewPasswordSuccess = (message) => {
  return {
    type: NEW_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const userNewPasswordError = (message) => {
  return {
    type: NEW_PASSWORD_ERROR,
    payload: message,
  };
};
