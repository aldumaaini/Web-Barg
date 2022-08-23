import {
  GET_USER_TRANSACTIONS,
  GET_USER_TRANSACTIONS_FAIL,
  GET_USER_TRANSACTIONS_SUCCESS,
  GET_ADMIN_TRANSACTIONS,
  GET_ADMIN_TRANSACTIONS_FAIL,
  GET_ADMIN_TRANSACTIONS_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  transactions: null,
  transactionsAdmin: null,
  error: null,
  message: null,
  loading: true,
  success: null,
};

const Transactions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        // loading: true,
      };

    case GET_ADMIN_TRANSACTIONS:
      return {
        ...state,
        // loading: true,
      };

    case GET_USER_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        error: null,
        loading: false,
        //success: true,
      };

    case GET_ADMIN_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactionsAdmin: action.payload,
        error: null,
        loading: false,
        //success: true,
      };

    case GET_USER_TRANSACTIONS_FAIL:
      return {
        ...state,
        // transactions: action.payload,
        error: action.payload,
        loading: false,
        success: false,
      };

    case GET_ADMIN_TRANSACTIONS_FAIL:
      return {
        ...state,
        // transactions: action.payload,
        error: action.payload,
        loading: false,
        success: false,
      };

    default:
      return state;
  }
};

export default Transactions;
