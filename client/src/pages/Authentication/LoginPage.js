import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Row,
  Col,
  Form,
  Label,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import Loader from "components/Loader";
// router
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../../store/actions";
import { useProfile, useRedux } from "hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";

const LoginPage = (props) => {
  const { dispatch, useAppSelector } = useRedux();

  const { user, isUserLogin, error, loginLoading } = useAppSelector(
    (state) => ({
      isUserLogin: state.Login.isUserLogin,
      error: state.Login.error,
      loginLoading: state.Login.loading,
      user: state.Login.user,
    })
  );

  const history = useHistory();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const resolver = yupResolver(
    yup.object().shape({
      mobile: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Please enter phone number"),
      password: yup.string().required("Please Enter Password."),
    })
  );

  const defaultValues = {
    mobile: "",
    password: "",
  };

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  const onSubmitForm = (values) => {
    dispatch(loginUser(values, history));
  };
  const { userProfile, loading } = useProfile();
  if (userProfile && !loading) {
    return (
      <Redirect
        to={{
          pathname: "dashboard",
        }}
      />
    );
  }

  useEffect(() => {
    if (isUserLogin && !loginLoading) {
      history.push("/dashboard");
    }
  }, [isUserLogin, history, loginLoading]);

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Welcome Back !"
              subtitle="Sign in to continue to Doot."
            />

            {error !== "" && <Alert color="danger">{error}</Alert>}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {loginLoading && <Loader />}
              <div className="mb-3">
                <FormInput
                  label="Phone number"
                  type="text"
                  name="mobile"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter phone number in country code format"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  className="form-control pe-5"
                  placeholder="Enter Password"
                />
              </div>

              {/*  <div className="form-check form-check-info font-size-16">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-check"
                />
                <Label
                  className="form-check-label font-size-14"
                  htmlFor="remember-check"
                >
                  Remember me
                </Label>
              </div>*/}

              <div className="text-center mt-4">
                <Button
                  color="primary"
                  className="w-100 btnLogin"
                  type="submit"
                >
                  Log In
                </Button>
              </div>
            </Form>

            <div className="mt-5 text-center text-muted">
              <p>
                Don't have an account ?{" "}
                <Link
                  to="/register"
                  className="fw-medium text-decoration-underline"
                >
                  {" "}
                  Register
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default LoginPage;
