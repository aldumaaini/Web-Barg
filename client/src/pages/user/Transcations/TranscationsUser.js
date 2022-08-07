import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Redirect } from "react-router-dom";
import { Col, Container, Row, Card, CardBody, Button } from "reactstrap";

//Import Breadcrumb
import { useProfile } from "hooks";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  addNewUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../../store/actions";
import DeleteModal from "./DeleteModal";
//css

const TranscationsUser = (props) => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [event, setEvent] = useState({});
  const { userProfile } = useProfile();
  const [isEdit, setIsEdit] = useState(false);
  if (userProfile && userProfile.isPhoneVerified === 0) {
    return <Redirect to={{ pathname: "/phone-number-verification" }} />;
  }
  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 500);
    }
  }, [modal, event]);

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
          <title>Transactions | Whatsapp Barg</title>
        </MetaTags>
        <Container fluid={true}>
          <div className="page-title-box">
            <Row className="align-items-center">
              {/* Render Breadcrumb */}
              <Breadcrumbs
                title="Whtasapp Barg"
                breadcrumbItem="Transactions"
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
                      <h4 className="card-title mb-4">Transactions</h4>
                      <div className="table-responsive">
                        <table className="table table-hover table-centered table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th scope="col"> #ID.</th>
                              <th scope="col">Name </th>
                              <th scope="col">amount</th>
                              <th scope="col"> Date</th>

                              <th scope="col" colSpan="4">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">#14256</th>

                              <td>Mubarak</td>
                              <td>99$</td>
                              <td>
                                <span className="badge bg-success">
                                  05/08/2022
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
                                  <Button
                                    color="primary"
                                    size="sm"
                                    style={{ width: 50, height: 30 }}
                                  >
                                    <i className="mdi mdi-open-in-new"></i>
                                  </Button>
                                </div>
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

TranscationsUser.propTypes = {
  users: PropTypes.array,
  className: PropTypes.string,
  onGetUsers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onUpdateUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
};

const mapStateToProps = ({ users }) => ({
  users: users,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUsers: () => dispatch(getUsers()),
  onAddNewUser: (user) => dispatch(addNewUser(user)),
  onUpdateUser: (user) => dispatch(updateUser(user)),
  onDeleteUser: (user) => dispatch(deleteUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TranscationsUser);
