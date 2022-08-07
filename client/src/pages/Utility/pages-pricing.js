import React from "react";
import { Container, Row } from "reactstrap";
import MetaTags from "react-meta-tags";

import CardPricing from "./card-pricing";

const PagesPricing = () => {
  const pricings = [
    {
      id: 1,
      title: "FREE",
      description: "free trial plan ",
      icon: "ion ion-ios-gift",
      buttonTitle: "TRY IT FREE",
      price: "0",
      duration: "Per month",
      link: "",
      features: [
        { icon: "mdi mdi-check", title: "Free 100 messages" },
        { icon: "mdi mdi-check", title: "One month" },

        { icon: "mdi mdi-close", title: "24/7 Support" },
      ],
    },
    {
      id: 2,
      title: "PREMIUM",
      description: "Premium plan with unlimited features",
      buttonTitle: "SUBSCRIBE",
      icon: "ion ion-ios-trophy",
      price: "100",
      duration: "Per month",
      link: "",
      features: [
        { icon: "mdi mdi-check", title: "+6000 messages" },
        { icon: "mdi mdi-check", title: "One month" },
        { icon: "mdi mdi-check", title: "24/7 Support" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Pricing</title>
        </MetaTags>
        <Container fluid>
          <Row>
            {pricings.map((pricing, key) => (
              <CardPricing pricing={pricing} key={"_pricing_" + key} />
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default PagesPricing;
