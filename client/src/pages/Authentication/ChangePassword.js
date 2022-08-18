import React, { useEffect, useState } from "react";
import { Alert, Row, Col, Form } from "reactstrap";
import { useParams } from "react-router-dom";
// hooks
//import { useRedux } from "../../hooks/index";
import { useRedux } from "hooks";
import { userNewPassword } from "store/actions";
// validations
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "components/Loader";

const ChangePassword = (props) => {
  const { token } = useParams();
  const [hashedToken, setHashedToken] = useState(null);
  const { useAppSelector, dispatch } = useRedux();
  const { newPasswordSuccessMsg, newPasswordError, newPasswordPassLoading } =
    useAppSelector((state) => ({
      newPasswordError: state.ForgetPassword.newPasswordError,
      newPasswordSuccessMsg: state.ForgetPassword.newPasswordSuccessMsg,
      newPasswordPassLoading: state.ForgetPassword.newPasswordPassLoading,
    }));

  useEffect(() => {
    if (token) {
      setHashedToken(token);
    }
  }, []);

  const resolver = yupResolver(
    yup.object().shape({
      password: yup.string().required("Please Enter New Password."),
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("Confirm new password value is required."),
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
    let valuess = { ...values, hashedToken };

    dispatch(userNewPassword(valuess));
  };

  // const { userProfile, loading } = useProfile();

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader title="Change Password" />

            {newPasswordError ? (
              <Alert color="danger">{newPasswordError}</Alert>
            ) : null}
            {newPasswordSuccessMsg ? (
              <Alert color="success">{newPasswordSuccessMsg}</Alert>
            ) : null}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {/*changePassLoading && <Loader />*/}

              <div className="mb-3">
                <FormInput
                  label="New Password"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter New Password"
                  className="form-control"
                  withoutLabel={true}
                  hidePasswordButton={false}
                />
              </div>
              <div className="mb-3">
                <FormInput
                  label="Confirm New Password"
                  type="password"
                  name="confirmpassword"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Enter Confirm Password"
                  className="form-control"
                  withoutLabel={true}
                  hidePasswordButton={true}
                />
              </div>

              <div className="text-center mt-4">
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-primary w-100"
                      type="submit"
                      disabled={newPasswordPassLoading ? true : false}
                    >
                      Reset password
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Col>
        {newPasswordPassLoading && <Loader />}
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default ChangePassword;
