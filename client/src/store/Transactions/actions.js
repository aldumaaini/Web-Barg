import {
  GET_USER_TRANSACTIONS,
  GET_USER_TRANSACTIONS_FAIL,
  GET_USER_TRANSACTIONS_SUCCESS,
  GET_ADMIN_TRANSACTIONS,
  GET_ADMIN_TRANSACTIONS_FAIL,
  GET_ADMIN_TRANSACTIONS_SUCCESS,
} from "./actionTypes";

export const getUserTransactionsShip = () => ({
  type: GET_USER_TRANSACTIONS,
});

export const getUserTransactionsSuccess = (data) => ({
  type: GET_USER_TRANSACTIONS_SUCCESS,
  payload: data,
});

export const getUserTransacrionsFail = (error) => ({
  type: GET_USER_TRANSACTIONS_FAIL,
  payload: error,
});

export const getAdminTransactionsShip = () => ({
  type: GET_ADMIN_TRANSACTIONS,
});

export const getAdminTransactionsSuccess = (data) => ({
  type: GET_ADMIN_TRANSACTIONS_SUCCESS,
  payload: data,
});

export const getAdminTransacrionsFail = (error) => ({
  type: GET_ADMIN_TRANSACTIONS_FAIL,
  payload: error,
});
