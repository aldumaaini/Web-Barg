import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

import { postRegister } from "../../../helpers/backend_helper";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  const response = yield call(postRegister, user);

  if (response.success === true) {
    yield put(registerUserSuccessful(response));
  } else {
    yield put(registerUserFailed(response.message));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
