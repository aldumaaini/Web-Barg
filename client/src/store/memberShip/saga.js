import { takeEvery, put, call, all, fork } from "redux-saga/effects";

// Calender Redux States
import { GET_MEMBERSHIP, USER_MEMBERSHIP_SUBSCRIPTION } from "./actionTypes";
import {
  getMemeberShipFail,
  getMemeberShipSuccess,
  userMemeberShipSubscriptionFail,
  userMemeberShipSubscriptionSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getMemberShipValidation,
  postUserSubscription,
} from "../../helpers/backend_helper";

function* fetchMemberShipValidation() {
  const response = yield call(getMemberShipValidation);

  if (response.success === true) {
    yield put(getMemeberShipSuccess(response.data));
  } else {
    yield put(getMemeberShipFail(response.data));
  }
}

function* postMemberShipSubscription({ payload: data }) {
  const response = yield call(postUserSubscription, data);

  if (response.success === true) {
    yield put(userMemeberShipSubscriptionSuccess(response.data));
  } else {
    yield put(userMemeberShipSubscriptionFail(response.data));
  }
}

export function* watchMemberShipRegister() {
  yield takeEvery(GET_MEMBERSHIP, fetchMemberShipValidation);
  yield takeEvery(USER_MEMBERSHIP_SUBSCRIPTION, postMemberShipSubscription);
}

function* memberShipSaga() {
  yield all([fork(watchMemberShipRegister)]);
}
export default memberShipSaga;
