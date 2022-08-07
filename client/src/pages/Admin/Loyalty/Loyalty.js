import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { Col, Container, Row, Card, CardBody, Button } from "reactstrap";
import Loader from "components/Loader";

//Import Breadcrumb

import Breadcrumbs from "components/Common/Breadcrumb";

import {
  /* addNewUser,
  deleteUser,
  getUsers,
  updateUser,*/
  isAuthUser,
  apiError,
} from "../../../store/actions";
import DeleteModal from "./DeleteModal";
//css

const Loyalty = (props) => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [event, setEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  /*useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 500);
    }
  }, [modal, event]);*/

  /**
   * Handling the modal state
   */
  const toggle = () => {
    setModal(!modal);
  };

  /**
   * On delete event
   */
  const handleAddNewUser = () => {};
  const handleDeleteEvent = () => {
    const { onDeleteEvent } = props;
    onDeleteEvent(event);
    setDeleteModal(false);
    toggle();
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Loyalty | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title="Whtasapp Barg"
                breadcrumbItem="Loyalty"
                buttonName="Create New user"
                haveButton={false}
                handleOnClick={() => {
                  handleAddNewUser();
                }}
              />
            </Row>
          </div>
          <Row>
            <Col className="col-12">
              {/* transactios table  */}
              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Loyalty</h4>
                      <div className="table-responsive">
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th scope="col"> No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">email</th>
                              <th scope="col">Total joined by</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">#14256</th>

                              <td>Mubarak</td>
                              <td>akoma919@gmail.com</td>
                              <td>
                                <span className="badge bg-success">5</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Loyalty.propTypes = {
  users: PropTypes.array,
  className: PropTypes.string,
  onGetUsers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onUpdateUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
};

const mapStateToProps = (state) => {
  // const { users } = state.users;
  const { error, isUserAuthenticated, loading } = state.isAuthUser;
  return { error, isUserAuthenticated, loading };
};

/*const mapDispatchToProps = (dispatch) => ({
  onGetUsers: () => dispatch(getUsers()),
  onAddNewUser: (user) => dispatch(addNewUser(user)),
  onUpdateUser: (user) => dispatch(updateUser(user)),
  onDeleteUser: (user) => dispatch(deleteUser(user)),
});*/

export default connect(mapStateToProps, { isAuthUser, apiError })(Loyalty);
