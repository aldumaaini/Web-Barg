import React from "react";
import { Redirect } from "react-router-dom";
import UserProfile from "../pages/Authentication/user-profile";
import Users from "pages/Admin/Users/Users";
import { useProfile } from "hooks";
import TransactionsAdmin from "pages/Admin/Transcations/Transcations";
import Loyalty from "pages/Admin/Loyalty/Loyalty";
import LoginPage from "pages/Authentication/LoginPage";
import Logout from "../pages/Authentication/Logout";
import RegisterPage from "pages/Authentication/RegisterPage";
import ChangePassword from "pages/Authentication/ChangePassword";
import RecoverPassword from "pages/Authentication/RecoverPassword";
import Referral from "pages/Authentication/Referral";
import DashboardUser from "pages/Dashboard";
import Home from "../components/Home/Home";
import TwostepVerification from "pages/Authentication/auth-two-step-verification";
import Checkout from "pages/user/checkout/Checkout";
import Pricing from "../pages/main/Pricing/Pricing";
import Faq from "../pages/main/Faq/Faq";
import Contact from "../pages/main/Contact/Contact";
import Memebership from "pages/user/Memebership/Memebership";
import TranscationsUser from "pages/user/Transcations/TranscationsUser";
import Pages404 from "pages/Utility/pages-404";
import Coupons from "pages/Admin/coupons/Coupons";
import CouponesUser from "pages/user/coupons/Coupons";

const userPrivateRoutes = [
  //admin dashboard routes
  { path: "/dashboard-user", component: DashboardUser },
  { path: "/profile-user", component: UserProfile },
  { path: "/coupons-user", component: CouponesUser },
  { path: "/user-transactions", component: TranscationsUser },
  { path: "/user-membership", component: Memebership },
  { path: "/phone-number-verification", component: TwostepVerification },
  { path: "/redirect", component: Checkout },
];

const adminPrivateRoutes = [
  //admin dashboard routes
  { path: "/dashboard-admin", component: DashboardUser },
  { path: "/users-admin", component: Users },
  { path: "/profile-admin", component: UserProfile },
  { path: "/transactions-admin", component: TransactionsAdmin },
  { path: "/loyalty-admin", component: Loyalty },
  { path: "/coupons-admin", component: Coupons },
];

const publicRoutes = [
  { path: "/home", component: Home },
  { path: "/pricing", component: Pricing },
  { path: "/faq", component: Faq },
  { path: "/contact", component: Contact },
  { path: "/logout", component: Logout },
  { path: "/login", component: LoginPage },
  { path: "/forgot-password", component: RecoverPassword },
  { path: "/register", component: RegisterPage },
  { path: "/change-password/:token", component: ChangePassword },
  { path: "/referral/:code", component: Referral },
  { path: "/", exact: true, component: () => <Redirect to="/home" /> },
  //{ path: "*", exact: true, component: Pages404 },
];

export { userPrivateRoutes, publicRoutes, adminPrivateRoutes };
