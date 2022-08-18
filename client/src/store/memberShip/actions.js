import {
  GET_MEMBERSHIP,
  GET_MEMBERSHIP_FAIL,
  GET_MEMBERSHIP_SUCCESS,
} from "./actionTypes";

export const getMemeberShip = () => ({
  type: GET_MEMBERSHIP,
});

export const getMemeberShipSuccess = (copunes) => ({
  type: GET_MEMBERSHIP_SUCCESS,
  payload: copunes,
});

export const getMemeberShipFail = (error) => ({
  type: GET_MEMBERSHIP_FAIL,
  payload: error,
});
