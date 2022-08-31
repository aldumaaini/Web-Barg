import { takeEvery, put, call } from "redux-saga/effects";

// Calender Redux States
import { GET_PRICING, UPDATE_PRICING } from "./actionTypes";
import {
  getPricingSuccess,
  getPricingFail,
  updatePricingSuccess,
  updatePricingFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getPricing, updatePricing } from "../../helpers/backend_helper";

function* fetchPricing() {
  const response = yield call(getPricing);
  if (response.success === true) {
    yield put(getPricingSuccess(response.data));
  } else {
    yield put(getPricingFail(response.message));
  }
}

function* onUpdatePricing({ payload: { price } }) {
  const response = yield call(updatePricing, price);
  if (response.success === true) {
    yield put(updatePricingSuccess(response.message));
  } else {
    yield put(updatePricingFail(response.message));
  }
}

function* pricingSaga() {
  yield takeEvery(GET_PRICING, fetchPricing);
  yield takeEvery(UPDATE_PRICING, onUpdatePricing);
}

export default pricingSaga;
