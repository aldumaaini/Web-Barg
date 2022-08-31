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

const getMemberShipValidation = () => get(url.MEMBERSHIP_VALIDATION);

const getUserTransactions = () => get(url.GET_USER_TRANSACTIONS);
//getAdminTransactions

const getAdminTransactions = () => get(url.GET_ADMIN_TRANSACTIONS);

const postUserSubscription = (data) =>
  post(url.USER_MEMBERSHIP_SUBSCRIPTION, data);
// Login Method
const postLogin = (data) => post(url.POST_LOGIN, data);

// postForgetPwd
const postForgetPwd = (data) => post(url.POST_FORGOT_PASSWORD, data);

//postnewpassword

const postNewPassword = (data) => post(url.POST_NEW_PASSWORD, data);

const postProfileEmail = (data) => post(url.POST_EDIT_PROFILE_EMAIL, data);
const postProfilePassword = (data) =>
  post(url.POST_EDIT_PROFILE_PASSWORD, data);
const postProfileVerifyPhone = (data) =>
  post(url.POST_EDIT_PROFILE_VERIFY_PHONE, data);

// Login Method

// get Users
export const getUsers = () => get(url.GET_USERS);
/* 
 getPricing, updatePricing
*/

export const getPricing = () => get(url.GET_PRICING);

export const updatePricing = (price) => put(url.UPDATE_PRICING, price);

// add Users
export const addNewUser = (user) => post(url.ADD_NEW_USER, user);

// update User
export const updateUser = (user) => put(url.UPDATE_USER, user);

// delete User
export const deleteUser = (id) => del(`${url.DELETE_USER}?id=${id}`);

// get getCoupones
export const getCoupones = () => get(url.GET_COUPONE);

export const usersGetCoupones = () => get(url.USER_GET_COUPONE);

// add addNewCoupone
export const addNewCoupone = (coupone) => post(url.ADD_NEW_COUPONE, coupone);

export const userPostCouponValidation = (name) =>
  post(url.USER_VALIDATE_COUPONE, name);
// delete deleteCoupone
export const deleteCoupone = (id) => del(`${url.DELETE_COUPONE}?id=${id}`);

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
  getActiveUser,
  getMemberShipValidation,
  postNewPassword,
  postUserSubscription,
  getUserTransactions,
  getAdminTransactions,
};
