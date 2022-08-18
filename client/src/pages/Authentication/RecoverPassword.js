import React from "react";
import { Alert, Row, Col, Form, Button, ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";

// validations
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { userForgetPassword } from "store/actions";
import { useRedux } from "hooks";
// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";

const RecoverPassword = (props) => {
  const { useAppSelector, dispatch } = useRedux();
  const [rSelected, setRSelected] = React.useState(null);

  const { forgetError, forgetSuccessMsg, forgetPassLoading } = useAppSelector(
    (state) => ({
      forgetError: state.ForgetPassword.forgetError,
      forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
      forgetPassLoading: state.ForgetPassword.forgetPassLoading,
    })
  );

  const resolver = yupResolver(
    yup.object().shape({
      email: yup.string().email("This value should be a valid email."),

      phone: yup.string(),
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
    dispatch(userForgetPassword(values));
  };

  //const { userProfile, loading } = useProfile();
  /*if (userProfile && !loading) {
    return <Redirect to={{ pathname: "/dashboard" }} />;
  }*/

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader title="Reset Password" subtitle="" />

            {forgetError && forgetError ? (
              <Alert color="danger">{forgetError.data}</Alert>
            ) : null}
            {forgetSuccessMsg ? (
              <Alert color="success">{forgetSuccessMsg}</Alert>
            ) : null}
            {!forgetError && !forgetSuccessMsg && rSelected === null && (
              <Alert color="info" className="text-center my-4">
                Please selected verification method
              </Alert>
            )}
            {!forgetError && !forgetSuccessMsg && rSelected && (
              <Alert color="info" className="text-center my-4">
                Enter your Email or Phone number and instructions will be sent
                to you!
              </Alert>
            )}
            <div className="mb-3">
              <ButtonGroup>
                <Button
                  color="primary"
                  outline
                  onClick={() => setRSelected("email")}
                  active={rSelected === "email"}
                >
                  Reset using E-mail address
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={() => setRSelected("phone")}
                  active={rSelected === "phone"}
                >
                  Reset using Phone Number
                </Button>
              </ButtonGroup>
            </div>
            {rSelected === "email" ? (
              <>
                <Form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="position-relative"
                >
                  {/*forgetPassLoading && <Loader />*/}
                  <div className="mb-3">
                    <FormInput
                      label="Email  "
                      type="email"
                      name="email"
                      register={register}
                      errors={errors}
                      control={control}
                      labelClassName="form-label"
                      placeholder="Enter E-mail address "
                      className="form-control"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <Button
                      color="primary"
                      className="w-100"
                      type="submit"
                      disabled={forgetPassLoading ? true : false}
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
                <div className="mt-5 text-center text-muted">
                  <p>
                    Remember It ?{" "}
                    <Link
                      to="/login"
                      className="fw-medium text-decoration-underline"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>
              </>
            ) : rSelected === "phone" ? (
              <>
                <Form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="position-relative"
                >
                  <div className="mb-3">
                    <FormInput
                      label="Phone Number"
                      type="text"
                      name="phone"
                      register={register}
                      errors={errors}
                      control={control}
                      labelClassName="form-label"
                      placeholder="Enter Phone number  i.e: 966509336310"
                      className="form-control"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <Button
                      color="primary"
                      className="w-100"
                      type="submit"
                      disabled={forgetPassLoading ? true : false}
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
                <div className="mt-5 text-center text-muted">
                  <p>
                    Remember It ?{" "}
                    <Link
                      to="/login"
                      className="fw-medium text-decoration-underline"
                    >
                      {" "}
                      Login
                    </Link>
                  </p>
                </div>
              </>
            ) : null}
          </div>
          {forgetPassLoading ? <Loader /> : null}
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default RecoverPassword;
