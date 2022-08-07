import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SuccessModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.openModal} toggle={props.toggle}>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.toggle()}>
            OK
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SuccessModal;
