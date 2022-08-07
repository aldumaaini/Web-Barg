import React from "react";
import { Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";
import logo from "../assets/images/logobw.png";
// images
import authImage from "../assets/images/auth-img.png";

const NonAuthLayoutWrapper = (props) => {
  return (
    <>
      <div className="auth-bg">
        <Container fluid className="p-0">
          <Row className=" g-0">
            <Col xl={3} lg={4}>
              <div className="p-4 pb-0 p-lg-5 pb-lg-0 auth-logo-section">
                <div className="text-white-50">
                  <Link to="/" className="text-white">
                    <img
                      src={logo}
                      style={{
                        width: 200,
                        height: 200,
                      }}
                    />
                  </Link>
                </div>
                <div className="mt-auto">
                  <img src={authImage} alt="auth" className="auth-img" />
                </div>
              </div>
            </Col>

            <Col xl={9} lg={8}>
              <div className="authentication-page-content">
                <div className="d-flex flex-column h-100 px-4 pt-4">
                  {props.children}

                  <Row className="">
                    <Col xl={12}>
                      <div className="text-center text-muted p-4"></div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default NonAuthLayoutWrapper;
