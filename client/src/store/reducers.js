import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import isAuthUser from "./auth/userAuth/reducer";
import MemberShip from "./memberShip/reducer";
//users
import Transactions from "./Transactions/reducer";
import Users from "./users/reducer";

import Coupnes from "./coupons/reducer";
import Pricing from "./pricing/reducer";
const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Users,
  isAuthUser,
  Coupnes,
  MemberShip,
  Transactions,
  Pricing,
});

export default rootReducer;
