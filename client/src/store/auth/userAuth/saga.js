import { call, all, put, takeEvery, fork } from "redux-saga/effects";
import { useHistory } from "react-router-dom";
// Login Redux States
import { IS_AUTH_USER } from "./actionTypes";
import { apiError, isAuthUserSuccess } from "./actions";

//Include Both Helper File with needed methods

import { isUserAuthenticated } from "../../../helpers/backend_helper";

function* isAuthUser(props) {
  const response = yield call(isUserAuthenticated);

  if (response.success === true) {
    localStorage.setItem("authToken", JSON.stringify(response.data.token));
    localStorage.setItem("authUser", JSON.stringify(response.data.user));
    yield put(isAuthUserSuccess(response));

    props.payload.history.push(
      props.payload.location === "/login"
        ? "/dashboard"
        : props.payload.location
    );
  } else {
    yield put(apiError(response.message));
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    props.payload.history.push("/login");
  }
}

export function* watchIsAuthUser() {
  yield takeEvery(IS_AUTH_USER, isAuthUser);
}

function* isAuthSaga() {
  yield all([fork(watchIsAuthUser)]);
}

export default isAuthSaga;
