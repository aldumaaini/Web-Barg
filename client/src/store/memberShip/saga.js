import { takeEvery, put, call, all, fork } from "redux-saga/effects";

// Calender Redux States
import { GET_MEMBERSHIP } from "./actionTypes";
import { getMemeberShipFail, getMemeberShipSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getMemberShipValidation } from "../../helpers/backend_helper";

function* fetchMemberShipValidation() {
  const response = yield call(getMemberShipValidation);

  if (response.success === true) {
    yield put(getMemeberShipSuccess(response.data));
  } else {
    yield put(getMemeberShipFail(response.data));
  }
}

export function* watchUserRegister() {
  yield takeEvery(GET_MEMBERSHIP, fetchMemberShipValidation);
}

function* memberShipSaga() {
  yield all([fork(watchUserRegister)]);
}
export default memberShipSaga;
