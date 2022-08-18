import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_NEW_USER_SUCCESS,
  ADD_NEW_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  ADD_NEW_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  error: null,
  message: null,
  loading: false,
  success: false,
};

const Users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS || UPDATE_USER || DELETE_USER || ADD_NEW_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
        loading: false,
        success: true,
      };

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    case ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
        loading: false,
        success: true,
      };

    case ADD_NEW_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
        users: state.users.map((user) =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
        users: state.users.filter(
          (user) => user.userID.toString() !== action.payload.toString()
        ),
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Users;
