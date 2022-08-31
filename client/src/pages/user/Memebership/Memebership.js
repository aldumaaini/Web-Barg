import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { Col, Container, Row, Card, CardBody, Alert } from "reactstrap";
import Loader from "components/Loader";
import CardPricing from "pages/Utility/card-pricing";
import "./card.css";
import { GoSell } from "@tap-payments/gosell";
//Import Breadcrumbs
import moment from "moment";
import Breadcrumbs from "components/Common/Breadcrumb";
import { useProfile, useRedux } from "hooks";
import DeleteModal from "./DeleteModal";
import VoucherModal from "./VoucherModal";
import {
  getMemeberShip,
  userMemeberShipSubscription,
  userValidateCoupons,
  getPricing,
} from "store/actions";
//css
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Cards from "react-credit-cards";
import "react-credit-cards/lib/styles.scss";
const Memebership = (props) => {
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);
  const [CouponeCode, setCouponeCode] = useState(null);
  const [DiscountAmount, setDiscountAmount] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(350);
  const [VoucherModalOpen, setVoucherModalOpen] = useState(false);
  const [PaymentError, setPaymentError] = useState(null);
  const [PaymentKey, setPaymentKey] = useState(null);
  const [IsValiedToken, setIsValiedToken] = useState(false);
  const { userProfile } = useProfile();
  const { useAppSelector, dispatch } = useRedux();
  const resolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please Enter coupon name."),
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
    setCouponeCode(values.name);
    dispatch(userValidateCoupons(values));
  };

  const {
    error,
    success,
    memebershipvalidation,
    subscriptionFail,
    subscriptionSuccess,
    loading,
    errorC,

    validationResultsuccess,
    pricingSuccess,
    pricingError,
    price,
    pricingMessage,
    isPricingLoading,
  } = useAppSelector((state) => ({
    subscriptionSuccess: state.MemberShip.subscriptionSuccess,
    subscriptionFail: state.MemberShip.subscriptionFail,
    success: state.MemberShip.success,
    error: state.MemberShip.error,
    memebershipvalidation: state.MemberShip.memebershipvalidation,
    loading: state.MemberShip.loading,
    errorC: state.Coupnes.error,
    validationResultsuccess: state.Coupnes.validationResultsuccess,

    pricingSuccess: state.Pricing.success,
    pricingError: state.Pricing.error,
    price: state.Pricing.price,
    pricingMessage: state.Pricing.message,
    isPricingLoading: state.Pricing.loading,
  }));

  useEffect(() => {
    setTimeout(async () => {
      let tokenString = localStorage.getItem("authToken");

      try {
        const userToken = JSON.parse(tokenString);
        await axios
          .get("/api/paymentKeys", {
            headers: { "x-auth-token": userToken },
          })
          .then((res) => {
            setPaymentKey(res?.data?.PayemntKey);
            setIsValiedToken(true);
          })
          .catch((err) => {
            setIsValiedToken(false);
          });
      } catch (err) {
        setIsValiedToken(false);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (props?.location?.state) {
      if (props.location.state.subscriptionStatus === true) {
        dispatch(userMemeberShipSubscription(props.location.state.data));
        setPaymentError(false);
        history.replace();
      } else {
        setPaymentError(true);
        history.replace();
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getMemeberShip());
    dispatch(getPricing());
  }, [subscriptionSuccess]);

  useEffect(() => {
    if (validationResultsuccess) {
      let Discount =
        validationResultsuccess.type === "Fixed"
          ? validationResultsuccess.fixedAmount
          : (parseFloat(validationResultsuccess.percentage) / 100) * 350;
      setDiscountAmount(Discount);
      setTotalAmount(price - parseFloat(Discount));
      setVoucherModalOpen(true);
      GoSell.openLightBox();
    }
  }, [validationResultsuccess]);

  if (userProfile && userProfile.isPhoneVerified === 0) {
    return <Redirect to={{ pathname: "/phone-number-verification" }} />;
  }

  const handlePrepareForPayment = () => {
    setDeleteModal(true);
    //
  };
  const callbackFunc = (response) => {};
  const onPopupClosed = (response) => {};

  const onConfirmClick = () => {
    setDeleteModal(false);
    setVoucherModalOpen(true);
  };

  const onCloseClicked = () => {
    setDeleteModal(false);
    GoSell.openLightBox();
  };
  if (loading || isPricingLoading) return <Loader />;

  const pricings = [
    {
      id: 2,
      title: "PREMIUM",
      description: "Premium plan with unlimited features",
      buttonTitle: "SUBSCRIBE",
      icon: "ion ion-ios-trophy",
      price: `${price}`,
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
      <VoucherModal
        show={VoucherModalOpen}
        onCloseClick={() => setVoucherModalOpen(false)}
        register={register}
        errors={errors}
        control={control}
        validationError={errorC}
        handleSubmit={handleSubmit}
        handleButtonClicked={onSubmitForm}
      />

      <DeleteModal
        show={deleteModal}
        onConfirmClick={onConfirmClick}
        onCloseClick={onCloseClicked}
      />
      <div className="page-content">
        <MetaTags>
          <title>Memebership | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title="Whtasapp Barg"
                breadcrumbItem="Membership"
                // buttonName="Create New user"
                haveButton={false}
              />
            </Row>
          </div>
          <Row>
            {PaymentError === true && (
              <Alert color="danger">Payment failed, please contact us</Alert>
            )}
            {PaymentError === false && (
              <Alert color="success">Payment success</Alert>
            )}
            {subscriptionFail !== false && (
              <Alert color="danger">
                Subscription proccess failed, please contact us
              </Alert>
            )}
            {subscriptionSuccess !== false && (
              <Alert color="success">
                Congrats, now you can enjoy unlimited use of the extention
              </Alert>
            )}

            {error !== null ? (
              error.code === 100 ? (
                error.planType === "Free" ? (
                  <div className=" py-4">
                    <Alert color="danger">
                      Your free trial plan has been expired.
                    </Alert>
                  </div>
                ) : (
                  <div className=" py-4">
                    <Alert color="danger">
                      Your subscription has been ended. please subscribe to
                      enjoy unlimited use of the extention
                    </Alert>
                  </div>
                )
              ) : error.code === 101 ? (
                <div className=" py-4">
                  <Alert color="danger">
                    Your account has been disabled, please{" "}
                    <a target="_blank" href="#">
                      contact us
                    </a>{" "}
                    for more information.
                  </Alert>
                </div>
              ) : error.code === 102 ? (
                <div className=" py-4">
                  <Alert color="danger">
                    you have exceeded the limit of messages for free accounts
                  </Alert>
                </div>
              ) : (
                <div className=" py-4">
                  <Alert color="info">Your Membership is active</Alert>
                </div>
              )
            ) : null}

            <Col className="col-12">
              {/* transactios table  */}
              <Row>
                <Col>
                  <Card>
                    <CardBody style={{ paddingTop: 30, paddingBottom: 50 }}>
                      <h4 className="card-title mb-4">Memebership Card</h4>
                      <Cards
                        locale={{ valid: "Expires" }}
                        cvc={"333"}
                        expiry={moment(
                          memebershipvalidation.PlanExpiryDate
                        ).format("MM/DD")}
                        // expiryyear={"2022"}
                        focused={true}
                        name={userProfile.FullName}
                        number={userProfile.memeberShipNumber}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col className="col-12">
              {/* transactios table  */}
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Memebership Details</h4>
                      <div className="table-responsive">
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th scope="col"> No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">Plan</th>
                              <th scope="col">Expiry</th>
                              <th scope="col">Status</th>
                              <th scope="col">Total left messages</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                {userProfile.memeberShipNumber}
                              </th>

                              <td>{userProfile.FullName}</td>
                              <td>
                                {memebershipvalidation.planType === "Free" ? (
                                  <h4 className="badge bg-success">
                                    {" "}
                                    {memebershipvalidation.planType}
                                  </h4>
                                ) : (
                                  <h4 className="badge bg-warning"> Premium</h4>
                                )}
                              </td>
                              <td>
                                <h4 className="badge bg-danger">
                                  {moment(
                                    memebershipvalidation.PlanExpiryDate
                                  ).fromNow()}
                                </h4>
                              </td>
                              <td>
                                {memebershipvalidation.status === "active" ? (
                                  <h4 className="badge bg-success">
                                    {memebershipvalidation.info}
                                  </h4>
                                ) : (
                                  <h4 className="badge bg-warning">
                                    {memebershipvalidation.status}
                                  </h4>
                                )}
                              </td>
                              <td>
                                <h4>
                                  {memebershipvalidation.planType === "Free"
                                    ? 100 -
                                      memebershipvalidation.totalUsedMessage
                                    : "∞"}
                                </h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            {memebershipvalidation.planType === "Free" ||
            (memebershipvalidation.planType === "Paid" &&
              memebershipvalidation.info !== "active") ? (
              <Col className="col-12">
                <Row>
                  <Col>
                    <Card>
                      <CardBody style={{ paddingTop: 30, paddingBottom: 50 }}>
                        <h4 className="card-title mb-4">Subscribe</h4>
                        <Container fluid>
                          {IsValiedToken && price !== 0 ? (
                            <Row>
                              {pricings.map((pricing, key) => (
                                <CardPricing
                                  onSubscribePress={() =>
                                    handlePrepareForPayment()
                                  }
                                  pricing={pricing}
                                  key={"_pricing_" + key}
                                />
                              ))}
                            </Row>
                          ) : (
                            <h4>Opss, something went wrong, reload the page</h4>
                          )}
                        </Container>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            ) : null}
          </Row>
          <GoSell
            gateway={{
              publicKey: PaymentKey,
              language: "ar",
              contactInfo: true,
              supportedCurrencies: ["SAR", "USD", "EUR"],
              supportedPaymentMethods: [
                "AMERICAN_EXPRESS",
                "MADA",
                "VISA",
                "MASTERCARD",
                "APPLE_PAY",
              ],
              saveCardOption: true,
              customerCards: true,
              notifications: "standard",
              callback: callbackFunc,
              onClose: onPopupClosed,
              labels: {
                cardNumber: "Card Number",
                expirationDate: "MM/YY",
                cvv: "CVV",
                cardHolder: "Name on Card",
                actionButton: "Pay",
              },
              style: {
                base: {
                  color: "#535353",
                  lineHeight: "18px",
                  fontFamily: "sans-serif",
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "rgba(0, 0, 0, 0.26)",
                    fontSize: "15px",
                  },
                },
                invalid: {
                  color: "red",
                  iconColor: "#fa755a ",
                },
              },
            }}
            customer={{
              first_name: userProfile.FullName,
              email: userProfile.email,
              phone: {
                country_code: "+",
                number: userProfile.phone,
              },
            }}
            order={{
              amount: TotalAmount,
              currency: "SAR",
              items: [
                {
                  id: 1,
                  name: "Premium subscription",
                  description:
                    "whatsapp barg premium subscription for one month",
                  quantity: "1",
                  amount_per_unit: `${price}`,
                  discount: {
                    type: "P",
                    value: `${CouponeCode}:${DiscountAmount}`,
                    code: CouponeCode,
                  },
                  total_amount: `${price - parseFloat(DiscountAmount)} `,
                },
              ],
              shipping: null,
              taxes: null,
            }}
            transaction={{
              mode: "charge",
              charge: {
                saveCard: true,
                threeDSecure: true,
                metadata: {},
                receipt: {
                  email: true,
                  sms: false,
                },
                redirect: `http://localhost:3001/redirect?code=${CouponeCode}`,
                post: "http://localhost:3000/api/callbackTap",
              },
            }}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Memebership;
