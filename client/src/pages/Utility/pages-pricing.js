import React from "react";
import { Container, Row } from "reactstrap";
import MetaTags from "react-meta-tags";

import CardPricing from "./card-pricing";
import { useTranslation } from 'react-i18next';





const PagesPricing = () => {
  const { t, i18n } = useTranslation();

  const pricings = [
    {
      id: 1,
      title: <b> {t('FREE')}</b>,
      description:<b> {t('free trial plan')}</b>,
      icon: "ion ion-ios-gift",
      buttonTitle:<b> {t("TRY IT FREE")} </b>, 
      price: <b> {t('0.00')}</b>,
      duration: <b> {t("Per month")}</b>,
      link: "",
      features: [
        { icon: "mdi mdi-check", title: <b>{t("Free 100 messages")}</b>},
        { icon: "mdi mdi-check", title: <b>{t("One month")}</b> },
        { icon: "mdi mdi-close", title: <b>{t("24/7 Support")}</b> },
      ],
    },
    {
      id: 2,
      title:<b> {t('PREMIUM')}</b> ,
      description: <b> {t('Premium plan with unlimited features')}</b>,
      buttonTitle:<b> {t('SUBSCRIBE')}</b>,
      icon: "ion ion-ios-trophy",
      price: "100",
      duration:<b> {t("Per month")}</b>,
      link: "",
      features: [
        { icon: "mdi mdi-check", title: <b> {t("6000 messages")}</b> },
        { icon: "mdi mdi-check", title: <b>{t("One month")}</b> },
        { icon: "mdi mdi-check", title: <b>{t("24/7 Support")}</b>  },
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
