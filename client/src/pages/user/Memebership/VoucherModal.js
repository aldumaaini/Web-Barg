import React from "react";
import { Col, Modal, ModalBody, Row, Form, Alert } from "reactstrap";
import FormInput from "components/FormInput";
const VoucherModal = ({
  show,
  onCloseClick,
  register,
  errors,
  control,
  handleSubmit,
  handleButtonClicked,
  validationError,
}) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Form
          onSubmit={handleSubmit(handleButtonClicked)}
          className="position-relative"
        >
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <i className="mdi mdi-gift" style={{ fontSize: "5em" }} />
                <h4>Do you have voucher? Redeem now !!! </h4>
                {validationError && (
                  <Alert color="danger">{validationError}</Alert>
                )}

                <div className="mb-3">
                  <FormInput
                    //   label="Coupone name"
                    type="text"
                    name="name"
                    register={register}
                    errors={errors}
                    control={control}
                    labelClassName="form-label"
                    placeholder="Enter Coupone name/code"
                    className="form-control"
                  />
                </div>
              </div>
            </Col>
          </Row>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <button type="submit" className="btn btn-success  ">
              Redeem
            </button>
            <button
              type="button"
              className="btn btn-danger  "
              onClick={onCloseClick}
            >
              Cancel
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default VoucherModal;
