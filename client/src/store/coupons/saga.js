import { takeEvery, put, call } from "redux-saga/effects";

// Calender Redux States
import { ADD_NEW_COUPONE, DELETE_COUPONE, GET_COUPONES } from "./actionTypes";
import {
  getCouponsSuccess,
  getCouponsFail,
  addCouponFail,
  addCouponSuccess,
  deleteCouponFail,
  deleteCouponSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCoupones,
  addNewCoupone,
  deleteCoupone,
} from "../../helpers/backend_helper";

function* fetchCoupones() {
  const response = yield call(getCoupones);

  if (response.success === true) {
    yield put(getCouponsSuccess(response.data));
  } else {
    yield put(getCouponsFail(response.message));
  }
}

function* onAddNewCoupone({ payload: coupone }) {
  const response = yield call(addNewCoupone, coupone);
  if (response.success === true) {
    yield put(addCouponSuccess(response.data));
  } else {
    yield put(addCouponFail(response.message));
  }
}

function* onDeleteCoupone({ payload: { id } }) {
  const response = yield call(deleteCoupone, id);

  if (response.success === true) {
    yield put(deleteCouponSuccess(response.data));
  } else {
    yield put(deleteCouponFail(response.message));
  }
}

function* couponesSaga() {
  yield takeEvery(GET_COUPONES, fetchCoupones);
  yield takeEvery(ADD_NEW_COUPONE, onAddNewCoupone);
  yield takeEvery(DELETE_COUPONE, onDeleteCoupone);
}

export default couponesSaga;
