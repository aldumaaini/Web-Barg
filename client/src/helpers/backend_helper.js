import { post, del, get, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  // TO DO ... {first check token with backend if valid or not}
  return get(url.GET_AUTHENTICATE_USER);
  //return getLoggedInUser() !== null;
};

const getActiveUser = isUserAuthenticated();

// Register Method
const postRegister = (data) => post(url.POST_REGISTER, data);

// Login Method
const postLogin = (data) => post(url.POST_LOGIN, data);

// postForgetPwd
const postForgetPwd = (data) => post(url.POST_FORGOT_PASSWORD, data);

// Edit profile
const postJwtProfile = (data) => post(url.POST_EDIT_JWT_PROFILE, data);

const postProfileEmail = (data) => post(url.POST_EDIT_PROFILE_EMAIL, data);
const postProfilePassword = (data) =>
  post(url.POST_EDIT_PROFILE_PASSWORD, data);
const postProfileVerifyPhone = (data) =>
  post(url.POST_EDIT_PROFILE_VERIFY_PHONE, data);

// Login Method

// postForgetPwd
const postJwtForgetPwd = (data) =>
  post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// get Users
export const getUsers = () => get(url.GET_EVENTS);

// add Users
export const addNewUser = (event) => post(url.ADD_NEW_EVENT, event);

// update User
export const updateUser = (event) => put(url.UPDATE_EVENT, event);

// delete User
export const deleteUser = (event) =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES);

export {
  getLoggedInUser,
  isUserAuthenticated,
  postRegister,
  postLogin,
  postProfileEmail,
  postProfilePassword,
  postProfileVerifyPhone,
  postForgetPwd,
  postJwtForgetPwd,
  postJwtProfile,
  getActiveUser,
};
