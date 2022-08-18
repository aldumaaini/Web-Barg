import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";

//Verification code package
import AuthCode from "react-auth-code-input";

import { Redirect, useHistory } from "react-router-dom";
import { Card, CardBody, Col, Container, Alert, Button, Row } from "reactstrap";
import { firebase, auth } from "helpers/firebase";
import { editProfileVerifyPhone } from "store/actions";
import Loader from "components/Loader";
import { useProfile, useRedux } from "hooks";

const TwostepVerification = () => {
  const { userProfile } = useProfile();
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [otp, setotp] = useState("");
  const [final, setfinal] = useState("");
  const { dispatch, useAppSelector } = useRedux();
  const history = useHistory();
  const { error, success } = useAppSelector((state) => ({
    success: state.Profile.success,
    error: state.Profile.error,
  }));
  useEffect(() => {
    if (success && !error) {
      let useAuthData = {
        ...userProfile,
        isPhoneVerified: 1,
      };
      localStorage.setItem("authUser", JSON.stringify(useAuthData));

      let path = "/dashboard";
      history.push(path);
    }
  }, [error, success]);

  const handleOnCodeChange = (res) => {
    setotp(res);
  };

  // Validate OTP
  const handleVerifyCode = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        if (result.user) {
          dispatch(editProfileVerifyPhone(userProfile.userId));
        }
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };
  const handleRequestCode = () => {
    setIsLoading(true);
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    let phoneNumber = `+${userProfile.phone}`;
    auth
      .signInWithPhoneNumber(phoneNumber, verify)
      .then((result) => {
        setfinal(result);
        setIsLoading(false);
        setIsCodeSent(!isCodeSent);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <MetaTags>
          <title>OTP Verification</title>
        </MetaTags>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="ti ti-mobile h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your phone number</h4>
                        {error && <Alert color="danger">{error}</Alert>}
                        {isCodeSent ? (
                          <p className="mb-5">
                            Please enter the 4 digit code sent to{" "}
                            <span className="font-weight-semibold">
                              {userProfile.phone}
                            </span>
                          </p>
                        ) : (
                          <p className="mb-5">
                            PLese verify{" "}
                            {
                              <span style={{ fontWeight: "bold" }}>
                                {userProfile.phone}
                              </span>
                            }{" "}
                            by requesting OTP
                          </p>
                        )}

                        {isCodeSent ? (
                          <Row>
                            <AuthCode
                              characters={6}
                              className="form-control form-control-lg text-center"
                              allowedCharacters="^[0-9]"
                              onChange={handleOnCodeChange}
                              inputStyle={{
                                width: "50px",
                                height: "42px",
                                padding: "8px",
                                borderRadius: "8px",
                                fontSize: "16px",
                                textAlign: "center",
                                marginRight: "15px",
                                border: "1px solid #ced4da",
                                textTransform: "uppercase",
                              }}
                            />
                          </Row>
                        ) : (
                          <div className="text-center mt-4">
                            <div
                              id="recaptcha-container"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            ></div>
                            {isLoading ? null : (
                              <Button
                                type="submit"
                                color="success"
                                onClick={() => {
                                  handleRequestCode();
                                }}
                              >
                                Request OTP
                              </Button>
                            )}
                          </div>
                        )}
                        {isCodeSent ? (
                          <div className="text-center mt-4">
                            <Button
                              type="submit"
                              color="success"
                              onClick={() => {
                                handleVerifyCode();
                              }}
                            >
                              Verify
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              {/* <div className="mt-5 text-center">
                <p>
                  Did't receive a code ?{" "}
                  <a href="#" className="fw-medium text-primary">
                    {" "}
                    Resend{" "}
                  </a>{" "}
                </p>
              </div>*/}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default TwostepVerification;
