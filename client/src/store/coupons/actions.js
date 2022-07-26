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

export const getCoupons = () => ({
  type: GET_COUPONES,
});

export const getCouponsSuccess = (copunes) => ({
  type: GET_COUPONES_SUCCESS,
  payload: copunes,
});

export const getCouponsFail = (error) => ({
  type: GET_COUPONES_FAIL,
  payload: error,
});

export const userValidateCoupons = (name) => ({
  type: USER_VALIDATE_COUPONES,
  payload: { name },
});

export const userValidateCouponsSuccess = (data) => ({
  type: USER_VALIDATE_COUPONES_SUCCESS,
  payload: data,
});

export const userValidateCouponsFail = (error) => ({
  type: USER_VALIDATE_COUPONES_FAIL,
  payload: error,
});

export const userGetCoupons = () => ({
  type: USER_GET_COUPONES,
});

export const userGetCouponsSuccess = (copunes) => ({
  type: USER_GET_COUPONES_SUCCESS,
  payload: copunes,
});

export const userGetCouponsFail = (error) => ({
  type: USER_GET_COUPONES_FAIL,
  payload: error,
});

export const addNewCoupon = (copune) => ({
  type: ADD_NEW_COUPONE,
  payload: copune,
});

export const addCouponSuccess = (copune) => ({
  type: ADD_NEW_COUPONE_SUCCESS,
  payload: copune,
});

export const addCouponFail = (error) => ({
  type: ADD_NEW_COUPONE_FAIL,
  payload: error,
});

export const deleteCoupon = (id) => ({
  type: DELETE_COUPONE,
  payload: { id },
});

export const deleteCouponSuccess = (id) => ({
  type: DELETE_COUPONE_SUCCESS,
  payload: id,
});

export const deleteCouponFail = (error) => ({
  type: DELETE_COUPONE_FAIL,
  payload: error,
});
