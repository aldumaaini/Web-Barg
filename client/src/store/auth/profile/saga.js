import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import {
  EDIT_PROFILE_EMAIL,
  EDIT_PROFILE_PASSWORD,
  EDIT_PROFILE_VERIFY_PHONE,
} from "./actionTypes";
import {
  profileSuccessEmail,
  profileErrorEmail,
  profileSuccessPassword,
  profileErrorPassword,
  profileSuccessVerifyPhone,
  profileErrorVerifyPhone,
} from "./actions";

import {
  postProfileEmail,
  postProfilePassword,
  postProfileVerifyPhone,
} from "../../../helpers/backend_helper";

function* editProfileEmail({ payload: { user } }) {
  const response = yield call(postProfileEmail, {
    email: user.email,
    id: user.idx,
  });

  if (response.success === true) {
    yield put(profileSuccessEmail(response));
    //history.push("/dashboard");
  } else {
    yield put(profileErrorEmail(response.message));
  }
}

function* editProfilePassword({ payload: { data } }) {
  const response = yield call(postProfilePassword, {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
    id: data.idx,
  });
  if (response.success === true) {
    yield put(profileSuccessPassword(response));
    //history.push("/dashboard");
  } else {
    yield put(profileErrorPassword(response.message));
  }
}

function* editProfileVerifyPhone({ payload: { user } }) {
  const response = yield call(postProfileVerifyPhone, {
    id: user,
  });

  if (response.success === true) {
    yield put(profileSuccessVerifyPhone(response));

    //history.push("/dashboard");
  } else {
    yield put(profileErrorVerifyPhone(response.message));
  }
}
export function* ProfileSaga() {
  yield takeEvery(EDIT_PROFILE_EMAIL, editProfileEmail);
  yield takeEvery(EDIT_PROFILE_PASSWORD, editProfilePassword);
  yield takeEvery(EDIT_PROFILE_VERIFY_PHONE, editProfileVerifyPhone);
}

/*function* ProfileSaga() {
  yield all([fork(watchProfile)]);
}*/

export default ProfileSaga;
