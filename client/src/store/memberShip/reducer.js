import {
  GET_MEMBERSHIP,
  GET_MEMBERSHIP_FAIL,
  GET_MEMBERSHIP_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  memebershipvalidation: null,
  error: null,
  message: null,
  loading: false,
  success: false,
};

const MemberShip = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP:
      return {
        ...state,
        loading: true,
      };
    case GET_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        memebershipvalidation: action.payload,
        error: null,
        loading: false,
        //success: true,
      };

    case GET_MEMBERSHIP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default MemberShip;
