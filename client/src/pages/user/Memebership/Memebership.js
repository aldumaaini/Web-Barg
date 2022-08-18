import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";

import { Redirect } from "react-router-dom";
import { Col, Container, Row, Card, CardBody, Alert } from "reactstrap";
import Loader from "components/Loader";
import CardPricing from "pages/Utility/card-pricing";
import "./card.css";
//Import Breadcrumbs
import moment from "moment";
import Breadcrumbs from "components/Common/Breadcrumb";
import { useProfile, useRedux } from "hooks";
import DeleteModal from "./DeleteModal";
import { getMemeberShip } from "store/actions";
//css
import Cards from "react-credit-cards";
import "react-credit-cards/lib/styles.scss";
const Memebership = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const { userProfile } = useProfile();
  const { useAppSelector, dispatch } = useRedux();

  const { error, success, memebershipvalidation } = useAppSelector((state) => ({
    success: state.MemberShip.success,
    error: state.MemberShip.error,
    memebershipvalidation: state.MemberShip.memebershipvalidation,
  }));

  useEffect(() => {
    dispatch(getMemeberShip());
  }, []);

  if (userProfile && userProfile.isPhoneVerified === 0) {
    return <Redirect to={{ pathname: "/phone-number-verification" }} />;
  }
  const pricings = [
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
  /**
   * On delete event
   */

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        //onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
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
                        expiry={moment(userProfile.PlanExpireDate).format(
                          "MM/DD"
                        )}
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
                                {userProfile.planType === "Free" ? (
                                  <h4 className="badge bg-success">
                                    {" "}
                                    {userProfile.planType}
                                  </h4>
                                ) : (
                                  <h4 className="badge bg-warning"> Premium</h4>
                                )}
                              </td>
                              <td>
                                <h4 className="badge bg-danger">
                                  {moment(userProfile.PlanExpireDate).fromNow()}
                                </h4>
                              </td>
                              <td>
                                {userProfile.planStatus === "active" ? (
                                  <h4 className="badge bg-success">
                                    {userProfile.planStatus}
                                  </h4>
                                ) : (
                                  <h4 className="badge bg-warning">
                                    {userProfile.planStatus}
                                  </h4>
                                )}
                              </td>
                              <td>
                                <h4>
                                  {userProfile.planType === "Free"
                                    ? 100 - userProfile.totalUsedMessage
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
            <Col className="col-12">
              <Row>
                <Col>
                  <Card>
                    <CardBody style={{ paddingTop: 30, paddingBottom: 50 }}>
                      <h4 className="card-title mb-4">Subscribe</h4>
                      <Container fluid>
                        <Row>
                          {pricings.map((pricing, key) => (
                            <CardPricing
                              pricing={pricing}
                              key={"_pricing_" + key}
                            />
                          ))}
                        </Row>
                      </Container>
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

export default Memebership;
