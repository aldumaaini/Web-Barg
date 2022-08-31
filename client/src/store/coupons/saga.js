import { takeEvery, put, call } from "redux-saga/effects";

// Calender Redux States
import {
  ADD_NEW_COUPONE,
  DELETE_COUPONE,
  GET_COUPONES,
  USER_GET_COUPONES,
  USER_VALIDATE_COUPONES,
} from "./actionTypes";
import {
  getCouponsSuccess,
  getCouponsFail,
  addCouponFail,
  addCouponSuccess,
  deleteCouponFail,
  deleteCouponSuccess,
  userGetCouponsFail,
  userGetCouponsSuccess,
  userValidateCouponsSuccess,
  userValidateCouponsFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCoupones,
  usersGetCoupones,
  addNewCoupone,
  deleteCoupone,
  userPostCouponValidation,
} from "../../helpers/backend_helper";

function* fetchCoupones() {
  const response = yield call(getCoupones);

  if (response.success === true) {
    yield put(getCouponsSuccess(response.data));
  } else {
    yield put(getCouponsFail(response.message));
  }
}

function* fetchUserCoupones() {
  const response = yield call(usersGetCoupones);
  if (response.success === true) {
    yield put(userGetCouponsSuccess(response.data));
  } else {
    yield put(userGetCouponsFail(response.message));
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

function* onValidateCoupone({ payload: name }) {
  const response = yield call(userPostCouponValidation, name);

  if (response.success === true) {
    yield put(userValidateCouponsSuccess(response.data));
  } else {
    yield put(userValidateCouponsFail(response.message));
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
  yield takeEvery(USER_VALIDATE_COUPONES, onValidateCoupone);
  yield takeEvery(USER_GET_COUPONES, fetchUserCoupones);
  yield takeEvery(GET_COUPONES, fetchCoupones);
  yield takeEvery(ADD_NEW_COUPONE, onAddNewCoupone);
  yield takeEvery(DELETE_COUPONE, onDeleteCoupone);
}

export default couponesSaga;
