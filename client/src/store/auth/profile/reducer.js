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

const initialState = {
  error: null,
  success: false,
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_EMAIL:
      state = { ...state };
      break;
    case EDIT_PROFILE_PASSWORD:
      state = { ...state };
      break;
    case EDIT_PROFILE_VERIFY_PHONE:
      state = { ...state };
      break;
    case PROFILE_SUCCESS_EMAIL:
      state = {
        ...state,
        success: true,
        message: action.payload.message,
        error: null,
      };
      break;
    case PROFILE_SUCCESS_VERIFY_PHONE:
      state = { ...state, success: true };
      break;
    case PROFILE_SUCCESS_PASSWORD:
      state = {
        ...state,
        success: true,
        message: action.payload.message,
        error: null,
      };
      break;

    case PROFILE_ERROR_EMAIL:
      state = { ...state, error: action.payload };
      break;
    case PROFILE_ERROR_PASSWORD:
      state = { ...state, error: action.payload };
      break;
    case PROFILE_ERROR_VERIFY_PHONE:
      state = { ...state, error: action.payload };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
