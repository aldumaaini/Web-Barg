import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";

import moment from "moment";

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  Button,
  Form,
  Alert,
} from "reactstrap";
import FormInput from "components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
//Import Breadcrumb
import { useRedux } from "hooks";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { addNewUser, deleteUser, getUsers } from "../../../store/actions";
import DeleteModal from "./DeleteModal";
//css
import Loader from "components/Loader";

const Users = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const [DeleteId, setDeleteId] = useState(null);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const { dispatch, useAppSelector } = useRedux();

  const { users, error, loading, success, message, successAdd } =
    useAppSelector((state) => ({
      error: state.Users.error,
      users: state.Users.users,
      message: state.Users.message,
      loading: state.Users.loading,
      success: state.Users.success,
      successAdd: state.Users.successAdd,
    }));

  const resolver = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .email("This value should be a valid email.")
        .required("Please Enter E-mail."),
      name: yup.string().required("Please Enter your name."),
      password: yup.string().required("Please Enter Password."),
      phone: yup.string().required("Please Enter phone number."),
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
    dispatch(addNewUser(values));
    setIsAddingUser(false);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [loading]);

  const handleOnDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };
  const handleAddNewUser = () => {
    setIsAddingUser(true);
  };
  const handleDeleteEvent = () => {
    dispatch(deleteUser(DeleteId));
    setDeleteModal(false);
  };
  if (loading) return <Loader />;
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Users | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title="Whtasapp Barg"
                breadcrumbItem="Users"
                buttonName="Create New user"
                haveButton={true}
                handleOnClick={() => {
                  handleAddNewUser();
                }}
              />
            </Row>
          </div>
          <Row>
            <Col className="col-12">
              {error !== null && <Alert color="danger">{error}</Alert>}
              {isAddingUser ? (
                <Form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="position-relative"
                >
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
                  <div className="mb-3">
                    <FormInput
                      label="Phone number"
                      type="text"
                      name="phone"
                      register={register}
                      errors={errors}
                      control={control}
                      withoutLabel={true}
                      labelClassName="form-label"
                      className="form-control pe-5"
                      placeholder="Enter phone number, eg; +966509336310"
                    />
                  </div>

                  <div className="text-center mb-3">
                    <Button
                      color="primary"
                      className="w-100  waves-effect waves-light"
                      type="submit"
                    >
                      Add user
                    </Button>
                  </div>
                </Form>
              ) : null}
              {/* transactios table  */}
              {!isAddingUser ? (
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardBody>
                        <h4 className="card-title mb-4">Users</h4>
                        <div className="table-responsive">
                          <table className="table table-hover table-centered table-nowrap mb-0">
                            <thead>
                              <tr>
                                <th scope="col"> No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone No.</th>
                                <th scope="col">Emaill</th>
                                <th scope="col">Plan type</th>
                                <th scope="col">Plan expiry</th>
                                <th scope="col">Status</th>
                                <th scope="col" colSpan="4">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {!loading && users
                                ? users.map((i, index) => (
                                    <tr key={index}>
                                      <th scope="row">#{i.userID}</th>

                                      <td>{i.FullName}</td>
                                      <td>{i.phone}</td>
                                      <td>{i.email}</td>
                                      <td>
                                        <span
                                          className={
                                            i.planType === "Free"
                                              ? "badge bg-success"
                                              : "badge bg-danger"
                                          }
                                        >
                                          {i.planType}
                                        </span>
                                      </td>
                                      <td>
                                        {moment(i.PlanExpireDate).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </td>
                                      <td>
                                        <span className="badge bg-success">
                                          {i.planStatus}
                                        </span>
                                      </td>
                                      <td>
                                        <div
                                          style={{
                                            // display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 110,
                                          }}
                                        >
                                          {/*  <Button
                                            color="primary"
                                            size="sm"
                                            style={{ width: 50, height: 30 }}
                                            onClick={() => {
                                              handleOnEdit(i.userID);
                                            }}
                                          >
                                            <i className="mdi mdi-pencil "></i>
                                          </Button>*/}

                                          <Button
                                            color="danger"
                                            size="sm"
                                            style={{
                                              width: 50,
                                              height: 30,
                                              marginLeft: 5,
                                            }}
                                            onClick={() => {
                                              handleOnDelete(i.userID);
                                            }}
                                          >
                                            <i className="mdi mdi-delete "></i>
                                          </Button>
                                        </div>
                                      </td>
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
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Users;
