import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useProfile, useRedux } from "hooks";
// Redux

import { Redirect } from "react-router-dom";
import { editProfileEmail, editProfilePassword } from "store/actions";
//Import Breadcrumb
import SuccessModal from "common/successModal";
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/avatar-10.png";
// actions

const UserProfile = (props) => {
  const { userProfile } = useProfile();
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");

  const [showModal, setShowModal] = useState(true);
  const [code, setCode] = useState(
    `http://localhost:3001/referral/${userProfile.code}`
  );
  const [idx, setidx] = useState(UserProfile.userId);
  const { dispatch, useAppSelector } = useRedux();

  const { error, success, message } = useAppSelector((state) => ({
    success: state.Profile.success,
    error: state.Profile.error,
    message: state.Profile.message,
  }));

  if (
    userProfile &&
    userProfile.role === "user" &&
    userProfile.isPhoneVerified === 0
  ) {
    return <Redirect to={{ pathname: "/phone-number-verification" }} />;
  }
  /* 
  useEffect(() => {
    if (success && !error) {
      let useAuthData = {
        ...userProfile,
        isPhoneVerified: 1,
      };
      localStorage.setItem("authUser", JSON.stringify(useAuthData));

      let path = "/user-dashboard";
      history.push(path);
    }
  }, [error, success]);
*/
  useEffect(() => {
    if (success && !error) {
      let useAuthData = {
        ...userProfile,
        email: email,
      };
      localStorage.setItem("authUser", JSON.stringify(useAuthData));
      /* if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"));

        setname(obj.FullName);
        setemail(obj.email);

        setidx(obj.userId);
      }*/
    }
  }, [error, success]);
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Referral code copied");
  };
  //
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));

      setname(obj.FullName);
      setemail(obj.email);
      setPhone(obj.phone);
      setidx(obj.userId);
    }
  }, [error, success]);

  function handleValidSubmitEmail(event, values) {
    let idx = userProfile.userId;
    let data = { idx, email: values.email };
    setemail(values.email);
    dispatch(editProfileEmail(data));
  }

  function handleValidSubmitPassword(event, values) {
    let idx = userProfile.userId;
    let data = {
      idx,
      oldPassword: values.passwordold,
      newPassword: values.passwordnew,
    };
    dispatch(editProfilePassword(data));
  }

  if (success && showModal) {
    //setShowModal(true);
    // openModal, toggle, title, children
    const handleToggle = () => {
      setShowModal(!showModal);
    };

    return (
      <SuccessModal
        openModal={showModal}
        toggle={() => {
          handleToggle();
        }}
      >
        <Col>
          <Row>
            <Col>
              <Card className="text-center">
                <CardBody>
                  <div className="py-4">
                    <i className="ion ion-ios-checkmark-circle-outline display-4 text-success"></i>

                    <h5 className="text mt-4">{message}</h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </SuccessModal>
    );
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Whatsapp Barg" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error ? <Alert color="danger">{error}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="align-self-center flex-1 ms-3">
                      <div className="text-muted">
                        <h6>{name}</h6>
                        <p className="mb-1">{email}</p>
                        <p className="mb-1">{phone}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Email</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmitEmail(e, v);
                }}
              >
                <div className="mb-3">
                  <AvField
                    name="email"
                    label="Email"
                    value={email || ""}
                    className="form-control"
                    placeholder="Enter new email"
                    type="text"
                    required
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="success">
                    Edit email
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
          <h4 className="card-title mb-4">Change Paaword</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmitPassword(e, v);
                }}
              >
                <div className="mb-3">
                  <AvField
                    name="passwordold"
                    label="Old Password"
                    type="password"
                    value={""}
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="passwordnew"
                    label="New Password"
                    type="password"
                    value={""}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your password",
                      },
                      pattern: {
                        value: "^[A-Za-z0-9]+$",
                        errorMessage:
                          "Your password must be composed only with letter and numbers",
                      },
                      minLength: {
                        value: 6,
                        errorMessage:
                          "Your password must be between 6 and 16 characters",
                      },
                      maxLength: {
                        value: 16,
                        errorMessage:
                          "Your password must be between 6 and 16 characters",
                      },
                    }}
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="success">
                    Update Password
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
          {userProfile.role === "admin" ? null : (
            <>
              <h4 className="card-title mb-4">Referral link</h4>

              <Card>
                <CardBody>
                  <InputGroup>
                    <Input
                      value={code}
                      disabled
                      Style={{ backgroundColor: "white", color: "Black" }}
                      placeholder="Enter Name"
                    ></Input>
                    <InputGroupAddon
                      addonType="prepend"
                      onClick={() => {
                        copyCode(code);
                      }}
                    >
                      <InputGroupText>
                        <i
                          class="fa fa-copy"
                          aria-hidden="true"
                          style={{ fontSize: 18 }}
                        ></i>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </CardBody>
              </Card>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
