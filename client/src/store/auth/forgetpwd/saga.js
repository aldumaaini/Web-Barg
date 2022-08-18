import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD, NEW_PASSWORD } from "./actionTypes";
import {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  userNewPasswordSuccess,
  userNewPasswordError,
} from "./actions";

//Include Both Helper File with needed methods

import {
  postForgetPwd,
  postNewPassword,
} from "../../../helpers/backend_helper";

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user } }) {
  const response = yield call(postForgetPwd, {
    email: user.email,
    phone: user.phone,
  });

  if (response.success === true) {
    yield put(userForgetPasswordSuccess(response.data));
  } else {
    yield put(userForgetPasswordError(response));
  }
}

function* newPasswordUser({ payload: { user } }) {
  const response = yield call(postNewPassword, {
    newPassword: user.password,
    token: user.hashedToken,
  });

  if (response.success === true) {
    yield put(userNewPasswordSuccess(response.data));
  } else {
    yield put(userNewPasswordError(response.data));
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
  yield takeEvery(NEW_PASSWORD, newPasswordUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
