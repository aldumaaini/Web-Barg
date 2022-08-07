import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";
import Salesdonut from "../../components/AllCharts/apex/salesdonut";
import { useProfile } from "hooks";
import "chartist/dist/scss/chartist.scss";

//i18n
import { withTranslation } from "react-i18next";

const DashboardUser = (props) => {
  const [menu, setMenu] = useState(false);
  const { userProfile } = useProfile();

  if (
    userProfile &&
    userProfile.role === "user" &&
    userProfile.isPhoneVerified === 0
  ) {
    return <Redirect to={{ pathname: "/phone-number-verification" }} />;
  }

  const toggle = () => {
    setMenu(!menu);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Welcome {userProfile.FullName}
                  </li>
                </ol>
              </Col>
            </Row>
          </div>

          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Orders
                    </h5>
                    <h4 className="fw-medium font-size-24">1,685 </h4>
                    {/*<div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div>*/}
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Revenue
                    </h5>
                    <h4 className="fw-medium font-size-24">52,368 </h4>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Average Price
                    </h5>
                    <h4 className="fw-medium font-size-24">15.8 </h4>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon4} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Product Sold
                    </h5>
                    <h4 className="fw-medium font-size-24">2436 </h4>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Sales Report</h4>
                  <div className="cleafix">
                    <p className="float-start">
                      <i className="mdi mdi-calendar me-1 text-primary"></i> Jan
                      01 - Jan 31
                    </p>
                    <h5 className="font-18 text-end">$4230</h5>
                  </div>
                  <div id="ct-donut" className="ct-chart wid pt-4">
                    <Salesdonut />
                  </div>
                  <div className="mt-4">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>
                            <span className="badge bg-primary">Desk</span>
                          </td>
                          <td>Desktop</td>
                          <td className="text-end">54.5%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-success">Mob</span>
                          </td>
                          <td>Mobile</td>
                          <td className="text-end">28.0%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="badge bg-warning">Tab</span>
                          </td>
                          <td>Tablets</td>
                          <td className="text-end">17.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* order success card */}
            {/* <Col xl={5}>
              <Row>
                <Col md={6}>
                  <Card className="text-center">
                    <CardBody>
                      <div className="py-4">
                        <i className="ion ion-ios-checkmark-circle-outline display-4 text-success"></i>

                        <h5 className="text-primary mt-4">Order Successful</h5>
                        <p className="text-muted">
                          Thanks you so much for your order.
                        </p>
                        <div className="mt-4">
                          <Link to="" className="btn btn-primary btn-sm">
                            Chack Status
                          </Link>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="bg-primary">
                    <CardBody>
                      <div className="text-center text-white py-4">
                        <h5 className="mt-0 mb-4 text-white-50 font-size-16">
                          Top Product Sale
                        </h5>
                        <h1>1452</h1>
                        <p className="font-size-14 pt-1">Computer</p>
                        <p className="text-white-50 mb-0">
                          At solmen va esser necessi far uniform myth...{" "}
                          <Link to="#" className="text-white">
                            View more
                          </Link>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Client Reviews</h4>
                      <p className="text-muted mb-3 pb-4">
                        " Everyone realizes why a new common language would be
                        desirable one could refuse to pay expensive translators
                        it would be necessary. "
                      </p>
                      <div className="float-end mt-2">
                        <Link to="#" className="text-primary">
                          <i className="mdi mdi-arrow-right h5"></i>
                        </Link>
                      </div>
                      <h6 className="mb-0">
                        {" "}
                        <img
                          src={user3}
                          alt=""
                          className="avatar-sm rounded-circle me-2"
                        />{" "}
                        James Athey
                      </h6>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>*/}
          </Row>
          {/* transactios table  */}
          <Row>
            {/* <Col xl={8}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Latest Transaction</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">(#) Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col" colSpan="2">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">#14256</th>
                          <td>
                            <div>
                              <img
                                src={user2}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Philip Smead
                            </div>
                          </td>
                          <td>15/1/2018</td>
                          <td>$94</td>
                          <td>
                            <span className="badge bg-success">Delivered</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14257</th>
                          <td>
                            <div>
                              <img
                                src={user3}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Brent Shipley
                            </div>
                          </td>
                          <td>16/1/2019</td>
                          <td>$112</td>
                          <td>
                            <span className="badge bg-warning">Pending</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14258</th>
                          <td>
                            <div>
                              <img
                                src={user4}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Robert Sitton
                            </div>
                          </td>
                          <td>17/1/2019</td>
                          <td>$116</td>
                          <td>
                            <span className="badge bg-success">Delivered</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14259</th>
                          <td>
                            <div>
                              <img
                                src={user5}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Alberto Jackson
                            </div>
                          </td>
                          <td>18/1/2019</td>
                          <td>$109</td>
                          <td>
                            <span className="badge bg-danger">Cancel</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14260</th>
                          <td>
                            <div>
                              <img
                                src={user6}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              David Sanchez
                            </div>
                          </td>
                          <td>19/1/2019</td>
                          <td>$120</td>
                          <td>
                            <span className="badge bg-success">Delivered</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">#14261</th>
                          <td>
                            <div>
                              <img
                                src={user2}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Philip Smead
                            </div>
                          </td>
                          <td>15/1/2018</td>
                          <td>$94</td>
                          <td>
                            <span className="badge bg-warning">Pending</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>*/}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

DashboardUser.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(DashboardUser);