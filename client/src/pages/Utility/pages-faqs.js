import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import { initReactI18next, useTranslation } from 'react-i18next';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


const PagesFaqs = () => {
  const { t , i18n} = useTranslation();
  const [faq1, setFaq1] = useState(true);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [faq5, setFaq5] = useState(true);
  const [faq6, setFaq6] = useState(false);
  const [faq7, setFaq7] = useState(false);
  const [faq8, setFaq8] = useState(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>FAQs </title>
        </MetaTags>
        <Container >
          {/* Render Breadcrumbs */}

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row className=" mb-5">
                    <div
                      className="faq-title pt-4 pb-4"
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="pt-3 pb-3" style={{ paddingRight: 10 }}>
                        <i className="ti-comments  h3"></i>
                      </div>
                      <h2> <strong> {t ('Frequently asked questions')}</strong></h2>
                    </div>
                  </Row>

                  <Row className="justify-content-center">
                    <Col lg={5}>
                      <h5 className="mt-0 font-size-18 mb-4">
                        <i
                          className="ti-agenda text-primary me-2"
                          style={{ color: "rgb(13, 193, 67)" }}
                        ></i>{" "}
                       {t ('General Questions')} 
                      </h5>
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <div className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button font-size-15 faq"
                              type="button"
                              onClick={() => {
                                setFaq1(!faq1);
                              }}
                            >
                             {t ('How to Open Account in Whatsapp Barg')}
                            </button>
                          </div>
                          <Collapse
                            isOpen={faq1}
                            className="accordion-collapse"
                          >
                            <div className="accordion-body">
                              <p className="text-muted mb-0">
                              {t ('Everyone realizes why a new common language would be desirable one could refuseto pay expensive translators. Toachieve this, it would be necessary to have uniform grammar')} 
                              </p>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <div className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button font-size-15 faq"
                              type="button"
                              onClick={() => {
                                setFaq3(!faq3);
                              }}
                            >
                              {t ('How to Open Account in Whatsapp Barg')}
                            </button>
                          </div>
                          <Collapse
                            isOpen={faq3}
                            className="accordion-collapse"
                          >
                            <div className="accordion-body">
                              <p className="text-muted mb-0">
                              {t ('Everyone realizes why a new common language would be desirable one could refuseto pay expensive translators. Toachieve this, it would be necessary to have uniform grammar')} 
                              </p>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <div className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button font-size-15 faq"
                              type="button"
                              onClick={() => {
                                setFaq2(!faq2);
                              }}
                            >
                              {t ('How to Open Account in Whatsapp Barg')}
                            </button>
                          </div>
                          <Collapse
                            isOpen={faq2}
                            className="accordion-collapse"
                          >
                            <div className="accordion-body">
                              <p className="text-muted mb-0">
                              {t ('Everyone realizes why a new common language would be desirable one could refuseto pay expensive translators. Toachieve this, it would be necessary to have uniform grammar')} 
                              </p>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                    </Col>

                    <div className="col-lg-5 offset-lg-1">
                      <h5 className="mt-0 font-size-18 mb-4">
                        <i
                          className="ti-bookmark-alt text-primary me-2"
                          style={{ color: "rgb(13, 193, 67)" }}
                        ></i>{" "}
                       {t('Pricing & Plans')}
                      </h5>
                      <div className="accordion" id="accordionExample2">
                        <div className="accordion-item">
                          <div className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button font-size-15 faq collapsed "
                              type="button"
                              onClick={() => {
                                setFaq5(!faq5);
                              }}
                            >
                               {t ('How to Open Account in Whatsapp Barg')}
                            </button>
                          </div>
                          <Collapse
                            isOpen={faq5}
                            className="accordion-collapse"
                          >
                            <div className="accordion-body">
                              <p className="text-muted mb-0">
                              {t ('Everyone realizes why a new common language would be desirable one could refuseto pay expensive translators. Toachieve this, it would be necessary to have uniform grammar')} 
                              </p>
                            </div>
                          </Collapse>
                        </div>

                        <div className="accordion-item">
                          <div className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button font-size-15 faq collapsed"
                              type="button"
                              onClick={() => {
                                setFaq6(!faq6);
                              }}
                            >
                              {t ('How to Open Account in Whatsapp Barg')}
                            </button>
                          </div>
                          <Collapse
                            isOpen={faq6}
                            className="accordion-collapse"
                          >
                            <div className="accordion-body">
                              <p className="text-muted mb-0">
                              {t ('Everyone realizes why a new common language would be desirable one could refuseto pay expensive translators. Toachieve this, it would be necessary to have uniform grammar')} 
                              </p>
                            </div>
                          </Collapse>
                        </div>

                        <div className="accordion-item">
                          <div className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button font-size-15 faq collapsed"
                              type="button"
                              onClick={() => {
                                setFaq7(!faq7);
                              }}
                            >
                             {t ('How to Open Account in Whatsapp Barg')}
                            </button>
                          </div>
                          <Collapse
                            isOpen={faq7}
                            className="accordion-collapse"
                          >
                            <div className="accordion-body">
                              <p className="text-muted mb-0">
                              {t ('Everyone realizes why a new common language would be desirable one could refuseto pay expensive translators. Toachieve this, it would be necessary to have uniform grammar')} 
                              </p>
                            </div>
                          </Collapse>
                        </div>

                        <div className="accordion-item">
                          <div className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button font-size-15 faq collapsed"
                              type="button"
                              onClick={() => {
                                setFaq8(!faq8);
                              }}
                            >
                             {t ('How to Open Account in Whatsapp Barg')}
                            </button>
                          </div>
                          <Collapse
                            isOpen={faq8}
                            className="accordion-collapse"
                          >
                            <div className="accordion-body">
                              <p className="text-muted mb-0">
                              {t ('Everyone realizes why a new common language would be desirable one could refuseto pay expensive translators. Toachieve this, it would be necessary to have uniform grammar')}
                             
                              </p>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PagesFaqs;
