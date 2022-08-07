import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods

import { postLogin } from "../../../helpers/backend_helper";

function* loginUser({ payload: { user, history } }) {
  const response = yield call(postLogin, {
    email: user.email,
    password: user.password,
  });

  if (response.success === true) {
    localStorage.setItem("authToken", JSON.stringify(response.data.token));
    localStorage.setItem("authUser", JSON.stringify(response.data.user));

    yield put(loginSuccess(response.data.user));
  } else {
    yield put(apiError(response.message));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
