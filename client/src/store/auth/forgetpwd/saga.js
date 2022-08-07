import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes";
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions";

//Include Both Helper File with needed methods

import {
  postForgetPwd,
  postJwtForgetPwd,
} from "../../../helpers/backend_helper";

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user } }) {
  try {
    const response = yield call(postForgetPwd, {
      email: user.email,
    });
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Reset link are sended to your mailbox, check there first"
        )
      );
    }
  } catch (error) {
    yield put(userForgetPasswordError(error));
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
