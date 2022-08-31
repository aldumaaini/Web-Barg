import {
  GET_PRICING,
  GET_PRICING_FAIL,
  UPDATE_PRICING,
  UPDATE_PRICING_FAIL,
  UPDATE_PRICING_SUCCESS,
  GET_PRICING_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  price: 0,
  error: null,
  message: null,
  loading: false,
  success: false,
  isUpdatingPrice: false,
};

const Pricing = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRICING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRICING:
      return {
        ...state,
        loading: true,
        isUpdatingPrice: true,
      };
    case UPDATE_PRICING_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: null,
        loading: false,
        success: true,
        isUpdatingPrice: false,
        //success: true,
      };

    case GET_PRICING_SUCCESS:
      return {
        ...state,
        price: action.payload,
        error: null,
        loading: false,
        success: true,
      };

    case GET_PRICING_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false,
      };

    case UPDATE_PRICING_FAIL:
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

export default Pricing;
