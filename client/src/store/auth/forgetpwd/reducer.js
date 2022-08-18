import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  NEW_PASSWORD,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_ERROR,
} from "./actionTypes";

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  forgetPassLoading: false,
  newPasswordSuccessMsg: null,
  newPasswordError: null,
  newPasswordPassLoading: false,
};

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        forgetPassLoading: true,
      };
      break;

    case NEW_PASSWORD:
      state = {
        ...state,
        newPasswordSuccessMsg: null,
        newPasswordError: null,
        newPasswordPassLoading: true,
      };
      break;
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
        forgetPassLoading: false,
      };
      break;
    case NEW_PASSWORD_SUCCESS:
      state = {
        ...state,
        newPasswordSuccessMsg: action.payload,
        newPasswordPassLoading: false,
      };
      break;

    case FORGET_PASSWORD_ERROR:
      state = {
        ...state,
        forgetError: action.payload,
        forgetPassLoading: false,
      };
      break;
    case NEW_PASSWORD_ERROR:
      state = {
        ...state,
        newPasswordError: action.payload,
        newPasswordPassLoading: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default forgetPassword;
