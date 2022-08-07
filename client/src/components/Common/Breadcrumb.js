import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  BreadcrumbItem,
 
  Button,
 
} from "reactstrap";

const Breadcrumb = (props) => {
 

  return (
    <Row className="align-items-center">
      <Col sm={6}>
        <div className="page-title-box">
          <h4 className="font-size-18">{props.breadcrumbItem}</h4>
          <ol className="breadcrumb mb-0">
            {props.maintitle ? (
              <>
                <BreadcrumbItem>
                  <Link to="/#">{props.maintitle}</Link>
                </BreadcrumbItem>
              </>
            ) : (
              ""
            )}
            <BreadcrumbItem>
              <Link to="/#">{props.title}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.breadcrumbItem}</BreadcrumbItem>
          </ol>
        </div>
      </Col>
      {props.haveButton ? (
        <Col sm={6}>
          <div className="float-end d-none d-md-block">
            <Button onClick={props.handleOnClick}>
              <i className="mdi mdi-account-plus me-2"></i> {props.buttonName}
            </Button>
          </div>
        </Col>
      ) : null}
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  haveButton: PropTypes.bool,
  buttonName: PropTypes.string,
  handleOnClick: PropTypes.func,
};

export default Breadcrumb;
