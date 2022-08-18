import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useRedux } from "hooks";
import { Col, Container, Row, Card, CardBody, Button } from "reactstrap";
import Breadcrumbs from "components/Common/Breadcrumb";
import { getUsers } from "store/actions";

const Loyalty = (props) => {
  const { dispatch, useAppSelector } = useRedux();

  const { users, success } = useAppSelector((state) => ({
    error: state.Users.error,
    users: state.Users.users,
    message: state.Users.message,
    loading: state.Users.loading,
    success: state.Users.success,
  }));
  useEffect(() => {
    setTimeout(() => {
      dispatch(getUsers());
    }, 100);
  }, [success]);

  const usersList = users?.map((i) => ({
    userID: i.userID,
    email: i.email,
    FullName: i.FullName,
    totalJoinedBy: users.filter((t) => t.referrer === i.code),
  }));

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Loyalty | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title="Whtasapp Barg"
                breadcrumbItem="Loyalty"
                haveButton={false}
              />
            </Row>
          </div>
          <Row>
            <Col className="col-12">
              {/* transactios table  */}
              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Loyalty</h4>
                      <div className="table-responsive">
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th scope="col"> No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">email</th>
                              <th scope="col">Total joined by</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users &&
                              usersList.map((i, index) => (
                                <tr key={index}>
                                  <th scope="row">{i.userID}</th>

                                  <td>{i.FullName}</td>
                                  <td>{i.email}</td>
                                  <td>
                                    {i.totalJoinedBy.length > 0 ? (
                                      <span className="badge bg-success">
                                        {i.totalJoinedBy.length}
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger">
                                        {i.totalJoinedBy.length}
                                      </span>
                                    )}
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

export default Loyalty;
