import {
  GET_COUPONES,
  GET_COUPONES_FAIL,
  GET_COUPONES_SUCCESS,
  ADD_NEW_COUPONE,
  ADD_NEW_COUPONE_FAIL,
  ADD_NEW_COUPONE_SUCCESS,
  DELETE_COUPONE,
  DELETE_COUPONE_FAIL,
  DELETE_COUPONE_SUCCESS,
  USER_GET_COUPONES,
  USER_GET_COUPONES_FAIL,
  USER_GET_COUPONES_SUCCESS,
  USER_VALIDATE_COUPONES,
  USER_VALIDATE_COUPONES_FAIL,
  USER_VALIDATE_COUPONES_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  coupones: [],
  error: null,
  message: null,
  loading: false,
  success: false,
  validationResultsuccess: null,
};

const Coupnes = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COUPONES ||
      DELETE_COUPONE ||
      ADD_NEW_COUPONE ||
      USER_GET_COUPONES ||
      USER_VALIDATE_COUPONES:
      return {
        ...state,
        loading: true,
      };
    case USER_GET_COUPONES_SUCCESS:
      return {
        ...state,
        coupones: action.payload,
        error: null,
        loading: false,
        //success: true,
      };

    case GET_COUPONES_SUCCESS:
      return {
        ...state,
        coupones: action.payload,
        error: null,
        loading: false,
        //success: true,
      };

    case USER_VALIDATE_COUPONES_SUCCESS:
      return {
        ...state,
        validationResultsuccess: action.payload,
        error: null,
        loading: false,
        //success: true,
      };

    case USER_VALIDATE_COUPONES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    case USER_GET_COUPONES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };
    case GET_COUPONES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    case ADD_NEW_COUPONE_SUCCESS:
      return {
        ...state,
        coupones: [...state.coupones, action.payload],
        error: null,
        loading: false,
        success: true,
      };

    case ADD_NEW_COUPONE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    case DELETE_COUPONE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
        coupones: state.coupones.filter(
          (coupone) => coupone.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_COUPONE_FAIL:
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

export default Coupnes;
