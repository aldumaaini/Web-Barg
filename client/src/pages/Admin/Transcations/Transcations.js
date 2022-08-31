import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Loader from "components/Loader";
import { Redirect } from "react-router-dom";
import { useRedux } from "hooks";
import { Col, Container, Row, Card, CardBody, Button, Form } from "reactstrap";
import PagesInvoice from "pages/Utility/PagesInvoice";
//Import Breadcrumb
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import CardPricing from "pages/Utility/card-pricing";
import { useProfile } from "hooks";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  getAdminTransactionsShip,
  getPricing,
  updatePricing,
} from "store/actions";
import InvoicseModal from "./InvoiceModal";
import moment from "moment";
import * as yup from "yup";
import { useForm } from "react-hook-form";
//css
import FormInput from "components/FormInput";

const TransactionsAdmin = (props) => {
  const [SelectedInvoiceData, setSelectedInvoiceData] = useState(null);
  const { dispatch, useAppSelector } = useRedux();
  const [InvoiceModal, setInvoiceModal] = useState(false);
  const { t } = useTranslation();
  const { userProfile } = useProfile();

  if (userProfile && userProfile.isPhoneVerified === 0) {
    return <Redirect to={{ pathname: "/phone-number-verification" }} />;
  }

  const resolver = yupResolver(
    yup.object().shape({
      price: yup.string().required("Please Enter new pricing."),
    })
  );

  const defaultValues = {};

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitForm = (values) => {
    dispatch(updatePricing(values));
    // setIsAddingUser(false);
  };

  const pricing = [
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

  const {
    transactionsAdmin,
    loading,
    pricingSuccess,
    pricingError,
    price,
    pricingMessage,
    isPricingLoading,
    isUpdatingPrice,
  } = useAppSelector((state) => ({
    error: state.Transactions.error,
    transactionsAdmin: state.Transactions.transactionsAdmin,
    message: state.Transactions.message,
    loading: state.Transactions.loading,
    success: state.Transactions.success,
    pricingSuccess: state.Pricing.success,
    pricingError: state.Pricing.error,
    price: state.Pricing.price,
    pricingMessage: state.Pricing.message,
    isPricingLoading: state.Pricing.loading,
    isUpdatingPrice: state.Pricing.isUpdatingPrice,
  }));

  useEffect(() => {
    dispatch(getAdminTransactionsShip());
  }, []);

  useEffect(() => {
    dispatch(getPricing());
  }, [isUpdatingPrice]);

  const handleShowInvoiceModal = (data) => {
    let InvoiceData = {
      id: data.receipt_id,
      date: data.madeAt,
      method: data.method,
      last4: data.cardLast4,
      email: data.cus_email,
      amount: parseFloat(data.amount),
      currency: data.currency,
      discount: parseFloat(data.discount),
      total: data.amount - data.discount,
    };
    setSelectedInvoiceData(InvoiceData);
    setInvoiceModal(true);
  };

  /**
   * On delete event
   */
  if (loading) return <Loader />;
  const closeInvoice = () => {
    setInvoiceModal(false);
    //setSelectedInvoiceData(null);
  };

  return (
    <React.Fragment>
      <InvoicseModal show={InvoiceModal} onCloseClick={closeInvoice}>
        <PagesInvoice data={SelectedInvoiceData} />
      </InvoicseModal>
      <div className="page-content">
        <MetaTags>
          <title>Transactions | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title="Whtasapp Barg"
                breadcrumbItem="Transactions"
                buttonName="Create New user"
                haveButton={false}
              />
            </Row>
          </div>
          <Row>
            <Col className="col-12">
              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Pricing</h4>
                      {isPricingLoading ? (
                        <Loader />
                      ) : !isPricingLoading && pricingError ? (
                        <Alert color="danger">{pricingError}</Alert>
                      ) : (
                        <Row lg="2">
                          <Col>
                            <Card className="pricing-box">
                              <CardBody className="p-4">
                                <div
                                  className="d-flex mt-2"
                                  style={{ flexDirection: "row" }}
                                >
                                  <i
                                    className={
                                      pricing[0].icon + " h2 align-self-center"
                                    }
                                  ></i>
                                  <div className="flex-1 ms-auto text-end">
                                    <h4 className="mt-0">{pricing[0].title}</h4>
                                    <p className="text-muted mb-0">
                                      {pricing[0].description}
                                    </p>
                                  </div>
                                </div>
                                <div className="pricing-features mt-5 pt-2">
                                  {pricing[0].features.map((feature, key) => (
                                    <p key={"_feature_" + key}>
                                      <i
                                        className={
                                          feature.icon + " text-primary me-2"
                                        }
                                      />{" "}
                                      {feature.title}
                                    </p>
                                  ))}
                                </div>
                                <div className="text-center mt-5">
                                  <h1 className="mb-0">
                                    <sup>
                                      <small>{t("Sar")}</small>
                                    </sup>
                                    {price}
                                    <span
                                      className="font-size-16"
                                      style={{ color: "#000" }}
                                    >
                                      {pricing[0].duration}
                                    </span>
                                  </h1>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                          <Col>
                            <Form
                              onSubmit={handleSubmit(onSubmitForm)}
                              className="position-relative"
                            >
                              <div className="mb-3">
                                <FormInput
                                  label="New Price"
                                  type="text"
                                  name="price"
                                  register={register}
                                  errors={errors}
                                  control={control}
                                  labelClassName="form-label"
                                  placeholder="Enter new plan price"
                                  className="form-control"
                                />
                              </div>
                              <div className="text-center mb-3">
                                <Button
                                  color="primary"
                                  className="w-100  waves-effect waves-light"
                                  type="submit"
                                >
                                  Update Plan pricing
                                </Button>
                              </div>
                            </Form>
                          </Col>
                        </Row>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              {/* transactios table  */}
              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Transactions</h4>
                      <div className="table-responsive">
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th scope="col"> #ID.</th>
                              <th scope="col">Amount </th>
                              <th scope="col">Discount</th>
                              <th scope="col"> Date</th>

                              <th scope="col" colSpan="4">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactionsAdmin.map((i, index) => (
                              <tr key={index}>
                                <th scope="row">{i.transactions_id}</th>

                                <td>{`${i.amount.toFixed(2)}  ${
                                  i.currency
                                }`}</td>
                                <td>{i.discount.toFixed(2)}</td>
                                <td>
                                  <span className="badge bg-success">
                                    {moment(i.madeAt).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                  </span>
                                </td>

                                <td>
                                  <div
                                    style={{
                                      // display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: 110,
                                    }}
                                  >
                                    <Button
                                      color="primary"
                                      size="sm"
                                      style={{ width: 50, height: 30 }}
                                      onClick={() => handleShowInvoiceModal(i)}
                                    >
                                      <i className="mdi mdi-open-in-new"></i>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TransactionsAdmin;
