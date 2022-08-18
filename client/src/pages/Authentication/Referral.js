import React from "react";
import { Redirect, useParams } from "react-router-dom";

const Referral = (props) => {
  // global store
  const { code } = useParams();

  if (code) {
    return (
      <Redirect
        to={{ pathname: "/register", state: { referral_code: code } }}
      />
    );
  } else {
    return <Redirect to={{ pathname: "/register" }} />;
  }
};

export default Referral;
