import React from "react";
import MetaTags from "react-meta-tags";
import { Row, Card, CardBody, Container } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import logobwhorizantal from "../../assets/images/logoblack.png";

const PagesInvoice = (data) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Invoice </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}

          <Row>
            <div className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    <div className="col-12">
                      <div className="invoice-title">
                        <h4 className="float-end font-size-16">
                          <strong>Order # {data.data.id}</strong>
                        </h4>
                        <h3 className="mt-0">
                          <img src={logobwhorizantal} alt="logo" height="40" />
                        </h3>
                      </div>
                      <hr />

                      <Row>
                        <div className="col-6 mt-4">
                          <address>
                            <strong>Payment Method:</strong>
                            <br />
                            {data.data.method} ending **** {data.data.last4}
                            <br />
                            {data.data.email}
                          </address>
                        </div>
                        <div className="col-6 mt-4 text-end">
                          <address>
                            <strong>Order Date:</strong>
                            <br />
                            {moment(data.data.date).format("MMMM Do YYYY")}
                            <br />
                            <br />
                          </address>
                        </div>
                      </Row>
                    </div>
                  </Row>

                  <Row>
                    <div className="col-12">
                      <div>
                        <div className="p-2">
                          <h3 className="font-size-16">
                            <strong>Order summary</strong>
                          </h3>
                        </div>
                        <div className="">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <td>
                                    <strong>Item</strong>
                                  </td>
                                  <td className="text-center">
                                    <strong>Price</strong>
                                  </td>
                                  <td className="text-center">
                                    <strong>Quantity</strong>
                                  </td>
                                  <td className="text-end">
                                    <strong>Totals</strong>
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Premium Subscription</td>
                                  <td className="text-center">{`${
                                    data.data.currency
                                  } ${data.data.amount.toFixed(2)}`}</td>
                                  <td className="text-center">1</td>
                                  <td className="text-end">
                                    <h6 className="m-0">
                                      {`${
                                        data.data.currency
                                      } ${data.data.amount.toFixed(2)}`}
                                    </h6>
                                  </td>
                                </tr>

                                <tr>
                                  <td className="no-line"></td>
                                  <td className="no-line"></td>
                                  <td className="no-line text-center">
                                    <strong>Discount</strong>
                                  </td>
                                  <td className="no-line text-end">
                                    <h6 className="m-0">
                                      {`${
                                        data.data.currency
                                      } ${data.data.discount.toFixed(2)}`}
                                    </h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="no-line"></td>
                                  <td className="no-line"></td>
                                  <td className="no-line text-center">
                                    <strong>Total</strong>
                                  </td>
                                  <td className="no-line text-end">
                                    <h6 className="m-0">
                                      {`${data.data.currency} ${
                                        data.data.amount.toFixed(2) -
                                        data.data.discount.toFixed(2)
                                      }`}
                                    </h6>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div>
                            <Link
                              to="#"
                              onClick={() => {
                                window.print();
                              }}
                              style={{ width: "100%" }}
                              className="btn btn-success  "
                            >
                              <i className="fa fa-print"></i>
                            </Link>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PagesInvoice;
