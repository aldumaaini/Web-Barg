import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import usersSaga from "./users/saga";
import isAuthSaga from "./auth/userAuth/saga";

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    isAuthSaga(),
    fork(AuthSaga),
    fork(ProfileSaga),
    ForgetSaga(),
    LayoutSaga(),
    fork(usersSaga),
  ]);
}
