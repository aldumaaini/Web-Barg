import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Label,
  Card,
  CardBody,
  Button,
  Form,
  Alert,
} from "reactstrap";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

import FormInput from "components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
//Import Breadcrumb
import { useProfile, useRedux } from "hooks";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { addNewCoupon, deleteCoupon, getCoupons } from "store/coupons/actions";
import DeleteModal from "./DeleteModal";
//css
import Loader from "components/Loader";

const Coupones = (props) => {
  const [modal, setModal] = useState(false);
  const [value, onChange] = useState(new Date());
  const [deleteModal, setDeleteModal] = useState(false);
  const [event, setEvent] = useState({});
  const [DeleteId, setDeleteId] = useState(null);
  const [RadioValue, setRadioValue] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const { dispatch, useAppSelector } = useRedux();
  // const storeStates = useAppSelector((state) => state);

  const { coupones, error, loading, success, message } = useAppSelector(
    (state) => ({
      error: state.Coupnes.error,
      coupones: state.Coupnes.coupones,
      message: state.Coupnes.message,
      loading: state.Coupnes.loading,
      success: state.Coupnes.success,
    })
  );

  const resolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please Enter coupone name."),
      description: yup.string().required("Please Enter coupone description."),
      // type: yup.string().required("Please select copone type."),
      expire: yup
        .string()
        .required("Please Enter expire date for this coupon."),
      numofuse: yup.string().required("Please max number of use."),
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
    let valuess = { ...values, type: RadioValue };

    dispatch(addNewCoupon(valuess));
    // let registrationData = { ...values, phone };
    // dispatch(registerUser(registrationData));
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  }, [success]);

  useEffect(() => {
    if (success && !error) {
      setTimeout(() => {
        setIsAddingUser(false);
      }, 100);
    }
  }, [coupones]);

  /**
   * On delete event
   */

  const onChangeValue = (event) => {
    setRadioValue(event.target.value);
  };

  const handleOnEdit = () => {};
  const handleOnDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };
  const handleAddNewCoupne = () => {
    setIsAddingUser(true);
  };
  const handleDeleteEvent = () => {
    dispatch(deleteCoupon(DeleteId));
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
                haveButton={true}
                handleOnClick={() => {
                  handleAddNewCoupne();
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
                      placeholder="Enter coupon name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      label="Description"
                      type="text"
                      name="description"
                      register={register}
                      errors={errors}
                      control={control}
                      labelClassName="form-label"
                      placeholder="Enter coupon description"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <FormInput
                      label="Number of use"
                      type="number"
                      name="numofuse"
                      register={register}
                      errors={errors}
                      control={control}
                      withoutLabel={true}
                      labelClassName="form-label"
                      className="form-control pe-5"
                      placeholder="Enter max number of use for this coupon"
                    />
                  </div>
                  <div className="mb-3">
                    <FormInput
                      label="Expire Date"
                      type="date"
                      name="expire"
                      register={register}
                      errors={errors}
                      control={control}
                      withoutLabel={true}
                      labelClassName="form-label"
                      className="form-control pe-5"
                      placeholder="Select expirdate for this coupon"
                    />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor={"type"} className={"form-label"}>
                      Type
                    </Label>
                    <FormInput
                      label="Fixed"
                      type="radio"
                      name="type"
                      value="Fixed"
                      register={register}
                      errors={errors}
                      onChange={onChangeValue}
                      control={control}
                      withoutLabel={true}
                      labelClassName="form-label"
                      // className="form-control pe-5"
                      // placeholder="Select expirdate for this coupon"
                    />

                    <FormInput
                      label="Percentage"
                      type="radio"
                      name="type"
                      value="Percentage"
                      register={register}
                      errors={errors}
                      onChange={onChangeValue}
                      control={control}
                      withoutLabel={true}
                      labelClassName="form-label"
                      // className="form-control pe-5"
                      //placeholder="Select expirdate for this coupon"
                    />
                  </div>
                  {RadioValue === "Fixed" ? (
                    <div className="mb-3">
                      <FormInput
                        label="Coupon fixed amount"
                        type="number"
                        name="fixedamount"
                        withoutLabel={true}
                        register={register}
                        errors={errors}
                        control={control}
                        labelClassName="form-label"
                        className="form-control pe-5"
                        placeholder="Enter fixed amount of coupon"
                      />
                    </div>
                  ) : RadioValue === "Percentage" ? (
                    <div className="mb-3">
                      <FormInput
                        label="Coupon percentage"
                        type="number"
                        name="percentage"
                        register={register}
                        errors={errors}
                        control={control}
                        withoutLabel={true}
                        labelClassName="form-label"
                        className="form-control pe-5"
                        placeholder="Enter percent disocunt amount of coupon"
                      />
                    </div>
                  ) : null}

                  <div className="text-center mb-3">
                    <Button
                      color="primary"
                      className="w-100  waves-effect waves-light"
                      type="submit"
                    >
                      Add new coupon
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
                                <th scope="col" colSpan="4">
                                  Actions
                                </th>
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
                                              handleOnDelete(i.id);
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

export default Coupones;
