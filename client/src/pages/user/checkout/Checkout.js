import React, { Component } from "react";
import { useProfile, useQuery } from "hooks";
import { GoSell } from "@tap-payments/gosell";
import { useHistory, useParams } from "react-router-dom";
const Checkout = () => {
  let history = useHistory();
  let query = useQuery();

  const { userProfile } = useProfile();
  const handleResponseCallback = (res) => {
    if (res.status === "CAPTURED") {
      history.push({
        pathname: "/user-membership",
        state: {
          subscriptionStatus: true,
          data: {
            transactions_id: res.id,
            status: res.status,
            amount: res.amount,
            currency: res.currency,
            receipt_id: res.receipt.id,
            cue_id: res.customer.id,
            cus_email: res.customer.email,
            cus_unique_id: userProfile.userId,
            method: res.card.brand,
            cardLast4: res.card.last_four,
            usedCoupon: query.get("code"),
          },
        },
      });
    } else {
      history.push({
        pathname: "/user-membership",
        state: {
          subscriptionStatus: false,
          data: null,
        },
      });
    }
  };

  return (
    <div className="App">
      <GoSell
        gateway={{
          callback: (response) => {
            let res = response.callback;
            handleResponseCallback(res);
          },
        }}
      />
    </div>
  );
};

export default Checkout;
