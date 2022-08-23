import {
  GET_MEMBERSHIP,
  GET_MEMBERSHIP_FAIL,
  GET_MEMBERSHIP_SUCCESS,
  USER_MEMBERSHIP_SUBSCRIPTION,
  USER_MEMBERSHIP_SUBSCRIPTION_FAIL,
  USER_MEMBERSHIP_SUBSCRIPTION_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  memebershipvalidation: null,
  error: null,
  message: null,
  loading: true,
  success: null,
  subscriptionSuccess: false,
  subscriptionFail: false,
};

const MemberShip = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERSHIP:
      return {
        ...state,
        // loading: true,
      };

    case USER_MEMBERSHIP_SUBSCRIPTION:
      return {
        ...state,
        //loading: true,
      };

    case GET_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        memebershipvalidation: action.payload,
        error: null,
        loading: false,
        //success: true,
      };

    case USER_MEMBERSHIP_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionSuccess: true,
        subscriptionFail: false,
        // loading: false,
        //success: true,
      };

    case USER_MEMBERSHIP_SUBSCRIPTION_FAIL:
      return {
        ...state,
        subscriptionSuccess: false,
        subscriptionFail: true,
        // loading: false,
      };
    case GET_MEMBERSHIP_FAIL:
      return {
        ...state,
        memebershipvalidation: action.payload,
        error: action.payload,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default MemberShip;
