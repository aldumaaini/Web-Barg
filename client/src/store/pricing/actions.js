import {
  GET_PRICING,
  GET_PRICING_FAIL,
  GET_PRICING_SUCCESS,
  UPDATE_PRICING,
  UPDATE_PRICING_FAIL,
  UPDATE_PRICING_SUCCESS,
} from "./actionTypes";

export const getPricing = () => ({
  type: GET_PRICING,
});

export const getPricingSuccess = (price) => ({
  type: GET_PRICING_SUCCESS,
  payload: price,
});

export const getPricingFail = (error) => ({
  type: GET_PRICING_FAIL,
  payload: error,
});

export const updatePricing = (price) => ({
  type: UPDATE_PRICING,
  payload: { price },
});

export const updatePricingSuccess = (success) => ({
  type: UPDATE_PRICING_SUCCESS,
  payload: success,
});

export const updatePricingFail = (error) => ({
  type: UPDATE_PRICING_FAIL,
  payload: error,
});
