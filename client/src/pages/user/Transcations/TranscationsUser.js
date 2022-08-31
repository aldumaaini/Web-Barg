import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Loader from "components/Loader";
import { Redirect } from "react-router-dom";
import { useRedux } from "hooks";
import { Col, Container, Row, Card, CardBody, Button } from "reactstrap";
import PagesInvoice from "pages/Utility/PagesInvoice";
//Import Breadcrumb
import { useProfile } from "hooks";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { getUserTransactionsShip } from "store/actions";
import InvoicseModal from "./InvoiceModal";
import moment from "moment";
//css

const TranscationsUser = (props) => {
  const [SelectedInvoiceData, setSelectedInvoiceData] = useState(null);
  const { dispatch, useAppSelector } = useRedux();
  const [InvoiceModal, setInvoiceModal] = useState(false);
  const [event, setEvent] = useState({});
  const { userProfile } = useProfile();
  const [isEdit, setIsEdit] = useState(false);
  if (userProfile && userProfile.isPhoneVerified === 0) {
    return <Redirect to={{ pathname: "/phone-number-verification" }} />;
  }

  const { transactions, error, loading, success, message } = useAppSelector(
    (state) => ({
      error: state.Transactions.error,
      transactions: state.Transactions.transactions,
      message: state.Transactions.message,
      loading: state.Transactions.loading,
      success: state.Transactions.success,
    })
  );

  useEffect(() => {
    dispatch(getUserTransactionsShip());
  }, []);

  const handleShowInvoiceModal = (data) => {
    let InvoiceData = {
      id: data.receipt_id,
      date: data.madeAt,
      method: data.method,
      last4: data.cardLast4,
      email: data.cus_email,
      amount: parseFloat(data.amount),
      currency: data.currency,
      discount: parseFloat(data.discount),
      total: data.amount - data.discount,
    };
    setSelectedInvoiceData(InvoiceData);
    setInvoiceModal(true);
  };

  /**
   * On delete event
   */
  if (loading) return <Loader />;
  const closeInvoice = () => {
    setInvoiceModal(false);
    // setSelectedInvoiceData(null);
  };

  return (
    <React.Fragment>
      <InvoicseModal show={InvoiceModal} onCloseClick={closeInvoice}>
        <PagesInvoice data={SelectedInvoiceData} />
      </InvoicseModal>
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
                              <th scope="col">Amount </th>
                              <th scope="col">Discount</th>
                              <th scope="col"> Date</th>

                              <th scope="col" colSpan="4">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions?.map((i) => (
                              <tr>
                                <th scope="row">{i.transactions_id}</th>

                                <td>{`${i.amount.toFixed(2)}  ${
                                  i.currency
                                }`}</td>
                                <td>{i.discount.toFixed(2)}</td>
                                <td>
                                  <span className="badge bg-success">
                                    {moment(i.madeAt).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
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
                                      onClick={() => handleShowInvoiceModal(i)}
                                    >
                                      <i className="mdi mdi-open-in-new"></i>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
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

export default TranscationsUser;
