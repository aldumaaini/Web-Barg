import {
  GET_MEMBERSHIP,
  GET_MEMBERSHIP_FAIL,
  GET_MEMBERSHIP_SUCCESS,
  USER_MEMBERSHIP_SUBSCRIPTION,
  USER_MEMBERSHIP_SUBSCRIPTION_FAIL,
  USER_MEMBERSHIP_SUBSCRIPTION_SUCCESS,
} from "./actionTypes";

export const getMemeberShip = () => ({
  type: GET_MEMBERSHIP,
});

export const getMemeberShipSuccess = (data) => ({
  type: GET_MEMBERSHIP_SUCCESS,
  payload: data,
});

export const getMemeberShipFail = (error) => ({
  type: GET_MEMBERSHIP_FAIL,
  payload: error,
});

export const userMemeberShipSubscription = (data) => ({
  type: USER_MEMBERSHIP_SUBSCRIPTION,
  payload: data,
});

export const userMemeberShipSubscriptionSuccess = (msg) => ({
  type: USER_MEMBERSHIP_SUBSCRIPTION_SUCCESS,
  payload: msg,
});

export const userMemeberShipSubscriptionFail = (error) => ({
  type: USER_MEMBERSHIP_SUBSCRIPTION_FAIL,
  payload: error,
});
