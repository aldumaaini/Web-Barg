import { takeEvery, put, call } from "redux-saga/effects";

// Calender Redux States
import {
  ADD_NEW_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER,
} from "./actionTypes";
import {
  getUsersSuccess,
  getUsersFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getUsers,
  addNewUser,
  updateUser,
  deleteUser,
} from "../../helpers/backend_helper";

function* fetchUsers() {
  const response = yield call(getUsers);

  if (response.success === true) {
    yield put(getUsersSuccess(response.data));
  } else {
    yield put(getUsersFail(response.message));
  }
}

function* onAddNewUser({ payload: { user } }) {
  const response = yield call(addNewUser, user);
  if (response.success === true) {
    yield put(addUserSuccess(response));
  } else {
    yield put(addUserFail(response.message));
  }
}

function* onUpdateUser({ payload: { user } }) {
  const response = yield call(updateUser, user);
  if (response.success === true) {
    yield put(updateUserSuccess(response));
  } else {
    yield put(updateUserFail(response.message));
  }
}

function* onDeleteUser({ payload: { id } }) {
  const response = yield call(deleteUser, id);

  if (response.success === true) {
    yield put(deleteUserSuccess(response.data));
  } else {
    yield put(deleteUserFail(response.message));
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
}

export default usersSaga;
