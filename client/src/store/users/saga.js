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
  try {
    const response = yield call(getUsers);
    yield put(getUsersSuccess(response));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user);
    yield put(addNewUser(response));
  } catch (error) {
    yield put(addUserFail(error));
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user);
    yield put(updateUserSuccess(response));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user);
    yield put(deleteUserSuccess(response));
  } catch (error) {
    yield put(deleteUserFail(error));
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
}

export default usersSaga;
