import { IS_AUTH_USER, API_ERROR, IS_AUTH_USER_SUCCESS } from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  isUserAuthenticated: false,
};

const isAuthUser = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTH_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case IS_AUTH_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        isUserAuthenticated: true,
      };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default isAuthUser;
