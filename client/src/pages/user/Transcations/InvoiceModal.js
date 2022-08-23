import PropTypes from "prop-types";
import React from "react";
import { Col, Modal, ModalBody, Row } from "reactstrap";

const InvoicseModal = ({ show, onCloseClick, children }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-8">
        <Row>
          <Col lg={12}>{children}</Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default InvoicseModal;
