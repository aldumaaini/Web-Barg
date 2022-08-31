import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";

import moment from "moment";

import { Col, Container, Row, Card, CardBody, Button, Alert } from "reactstrap";
import "react-calendar/dist/Calendar.css";
import { useRedux } from "hooks";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { userGetCoupons } from "store/actions";

//css
import Loader from "components/Loader";

const CouponesUser = (props) => {
  const { dispatch, useAppSelector } = useRedux();
  // const storeStates = useAppSelector((state) => state);

  const { coupones, error, loading, success, message, users } = useAppSelector(
    (state) => ({
      error: state.Coupnes.error,
      coupones: state.Coupnes.coupones,
      message: state.Coupnes.message,
      loading: state.Coupnes.loading,
      success: state.Coupnes.success,
      users: state.Users.users,
    })
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(userGetCoupons());
    }, 100);
  }, [success]);

  if (loading) return <Loader />;
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Coupons | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              {error !== null && <Alert color="danger">{error}</Alert>}
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title="Whtasapp Barg"
                breadcrumbItem="Coupons"
                buttonName="Create New Coupon"
                haveButton={false}
              />
            </Row>
          </div>
          <Row>
            <Col className="col-12">
              {error !== null && <Alert color="danger">{error}</Alert>}

              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Coupons</h4>
                      <div className="table-responsive">
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th scope="col"> No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Number of use</th>
                              <th scope="col">Coupone type</th>
                              <th scope="col">Coupone expiry</th>
                              <th scope="col">Percentage</th>
                              <th scope="col">Fixed Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {!loading && coupones
                              ? coupones.map((i, index) => (
                                  <tr key={index}>
                                    <th scope="row">#{i.id}</th>

                                    <td>{i.name}</td>
                                    <td>{i.description}</td>
                                    <td>{i.numOfUse}</td>
                                    <td>
                                      <span
                                        className={
                                          i.type === "fixed"
                                            ? "badge bg-success"
                                            : "badge bg-danger"
                                        }
                                      >
                                        {i.type}
                                      </span>
                                    </td>
                                    <td>
                                      {moment(i.expire).format("YYYY-MM-DD")}
                                    </td>
                                    <td>
                                      <span className="badge bg-success">
                                        {i.percentage}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="badge bg-success">
                                        {i.fixedAmount}
                                      </span>
                                    </td>
                                    <td></td>
                                  </tr>
                                ))
                              : null}
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

export default CouponesUser;
