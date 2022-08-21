import React from "react";
import { Container, Row } from "reactstrap";
import MetaTags from "react-meta-tags";

import CardPricing from "./card-pricing";
import { useTranslation } from 'react-i18next';
import "./utility.css";




const PagesPricing = () => {
  const { t, i18n } = useTranslation();

  const pricings = [
    {
      id: 1,
      title:  t('FREE'),
      description: t('free trial plan'),
      icon: "ion ion-ios-gift",
      buttonTitle:t("TRY IT FREE"), 
      price: t('0.00'),
      duration: t("Per month"),
      link: "",
      features: [
        { icon: "mdi mdi-check", title: t("Free 100 messages")},
        { icon: "mdi mdi-check", title: t("One month") },
        { icon: "mdi mdi-close", title: t("24/7 Support") },
      ],
    },
    {
      id: 2,
      title: t('PREMIUM'),
      description:t('Premium plan with unlimited features'),
      buttonTitle:t('SUBSCRIBE'),
      icon: "ion ion-ios-trophy",
      price: "100",
      duration: t("Per month"),
      link: "",
      features: [
        { icon: "mdi mdi-check", title: t("6000 messages") },
        { icon: "mdi mdi-check", title: t("Per month"),},
        { icon: "mdi mdi-check", title: t("24/7 Support")  },
      ],
    },
  ];
  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{t(" Pricing")}</title>
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
