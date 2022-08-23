import { takeEvery, put, call, all, fork } from "redux-saga/effects";

// Calender Redux States
import { GET_USER_TRANSACTIONS, GET_ADMIN_TRANSACTIONS } from "./actionTypes";
import {
  getUserTransacrionsFail,
  getUserTransactionsSuccess,
  getAdminTransacrionsFail,
  getAdminTransactionsSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getUserTransactions,
  getAdminTransactions,
} from "../../helpers/backend_helper";

function* fetchUserTransactions() {
  const response = yield call(getUserTransactions);

  if (response.success === true) {
    yield put(getUserTransactionsSuccess(response.data));
  } else {
    yield put(getUserTransacrionsFail(response.data));
  }
}

function* fetchAdminTransactions() {
  const response = yield call(getAdminTransactions);

  if (response.success === true) {
    yield put(getAdminTransactionsSuccess(response.data));
  } else {
    yield put(getAdminTransacrionsFail(response.data));
  }
}

export function* watchTransactionsRegister() {
  yield takeEvery(GET_USER_TRANSACTIONS, fetchUserTransactions);
  yield takeEvery(GET_ADMIN_TRANSACTIONS, fetchAdminTransactions);
}

function* TransactionsSaga() {
  yield all([fork(watchTransactionsRegister)]);
}
export default TransactionsSaga;
