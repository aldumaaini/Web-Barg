import {
  PROFILE_ERROR_EMAIL,
  PROFILE_SUCCESS_EMAIL,
  EDIT_PROFILE_EMAIL,
  EDIT_PROFILE_PASSWORD,
  PROFILE_ERROR_PASSWORD,
  PROFILE_SUCCESS_PASSWORD,
  EDIT_PROFILE_VERIFY_PHONE,
  PROFILE_SUCCESS_VERIFY_PHONE,
  PROFILE_ERROR_VERIFY_PHONE,
} from "./actionTypes";

export const editProfileEmail = (user) => {
  return {
    type: EDIT_PROFILE_EMAIL,
    payload: { user },
  };
};

export const profileSuccessEmail = (msg) => {
  return {
    type: PROFILE_SUCCESS_EMAIL,
    payload: msg,
  };
};

export const profileErrorEmail = (error) => {
  return {
    type: PROFILE_ERROR_EMAIL,
    payload: error,
  };
};

////

export const editProfilePassword = (data) => {
  return {
    type: EDIT_PROFILE_PASSWORD,
    payload: { data },
  };
};

export const profileSuccessPassword = (response) => {
  return {
    type: PROFILE_SUCCESS_PASSWORD,
    payload: response,
  };
};

export const profileErrorPassword = (error) => {
  return {
    type: PROFILE_ERROR_PASSWORD,
    payload: error,
  };
};

////

export const editProfileVerifyPhone = (user) => {
  return {
    type: EDIT_PROFILE_VERIFY_PHONE,
    payload: { user },
  };
};

export const profileSuccessVerifyPhone = (msg) => {
  return {
    type: PROFILE_SUCCESS_VERIFY_PHONE,
    payload: msg,
  };
};

export const profileErrorVerifyPhone = (error) => {
  return {
    type: PROFILE_ERROR_VERIFY_PHONE,
    payload: error,
  };
};
