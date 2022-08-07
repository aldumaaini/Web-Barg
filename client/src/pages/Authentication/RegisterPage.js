import React from "react";
import { Alert, Row, Col, Form, Button, Label } from "reactstrap";
import { useRedux, useProfile } from "hooks";
import { Link, Redirect } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { registerUser } from "store/actions";
import Loader from "components/Loader";
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";

const RegisterPage = (props) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();
  const [phone, setphone] = React.useState("");

  const { user, registrationError, regLoading, message } = useAppSelector(
    (state) => ({
      user: state.Account.user,
      registrationError: state.Account.registrationError,
      regLoading: state.Account.loading,
      message: state.Account.message,
    })
  );

  const resolver = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .email("This value should be a valid email.")
        .required("Please Enter E-mail."),
      name: yup.string().required("Please Enter your name."),
      password: yup.string().required("Please Enter Password."),
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
    let registrationData = { ...values, phone };

    dispatch(registerUser(registrationData));
  };

  const { userProfile, loading } = useProfile();

  if (userProfile && !loading) {
    return <Redirect to={{ pathname: "/dashboard" }} />;
  }

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Register Account"
              subtitle="Get your free account now."
            />

            {user && user ? (
              <Alert color="success">Register User Successfully</Alert>
            ) : null}

            {registrationError && registrationError ? (
              <Alert color="danger">{registrationError}</Alert>
            ) : null}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {regLoading && <Loader />}
              <div className="mb-3">
                <FormInput
                  label="Name"
                  type="text"
                  name="name"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter full name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <FormInput
                  label="Email"
                  type="text"
                  name="email"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Email"
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
                  withoutLabel={true}
                  labelClassName="form-label"
                  className="form-control pe-5"
                  placeholder="Enter Password"
                />
              </div>
              <Label className="form-label">Phone Number</Label>
              <div className="mb-3">
                <PhoneInput
                  country={"us"}
                  value={phone}
                  enableSearch
                  onChange={(phone) => setphone(phone)}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>

              <div className="mb-4">
                <p className="mb-0">
                  By registering you agree to the Whatsapp Barg{" "}
                  <Link to="#" className="text-primary">
                    Terms of Use
                  </Link>
                </p>
              </div>

              <div className="text-center mb-3">
                <Button
                  color="primary"
                  className="w-100  waves-effect waves-light"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </Form>

            <div className="mt-5 text-center text-muted">
              <p>
                Already have an account ?{" "}
                <Link
                  to="/login"
                  className="fw-medium text-decoration-underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default RegisterPage;
