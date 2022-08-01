import React from "react";
import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";

import "./PricingStyles.css";

const Pricing = () => {
  return (
    <div className="pricing">
      <div className="container">
        <div className="top-content">
          <div>
            <h2>
              Choose your plan to <span> Enjoy the App features</span>
            </h2>
            <p>
              Includes every feature we offer plus unlimited projects and
              unlimited users.
            </p>
          </div>
        </div>

        <div className="Pricings-tables">
          <PricingTable highlightColor="#0dc143">
            <PricingSlot
              buttonText="TRY IT FREE"
              title="FREE"
              priceText="$0/month"
            >
              <PricingDetail>
                {" "}
                <b>100</b> Message
              </PricingDetail>
              <PricingDetail>
                {" "}
                <b>One </b> Month
              </PricingDetail>
              <PricingDetail strikethrough>
                {" "}
                <b>24/7</b> Support
              </PricingDetail>
            </PricingSlot>

            <PricingSlot
              highlighted
              buttonText="SUBSCRIBE"
              title="PREMIUM "
              priceText="$100/month"
            >
              <PricingDetail>
                {" "}
                <b>6000</b> Message
              </PricingDetail>
              <PricingDetail>
                {" "}
                <b>One</b> Month
              </PricingDetail>
              <PricingDetail>
                {" "}
                <b>24/7</b> Support
              </PricingDetail>
            </PricingSlot>
          </PricingTable>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
