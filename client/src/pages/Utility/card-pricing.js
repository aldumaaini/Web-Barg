import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col } from "reactstrap";
import "./utility.css";

const CardPricing = (props) => {
  return (
    <React.Fragment>
      <Col xl="4" md="6">
        <Card className="pricing-box">
          <CardBody className="p-4">
            <div className="d-flex mt-2" style={{ flexDirection: "row" }}>
              <i className={props.pricing.icon + " h2 align-self-center"}></i>
              <div className="flex-1 ms-auto text-end">
                <h4 className="mt-0">{props.pricing.title}</h4>
                <p className="text-muted mb-0">{props.pricing.description}</p>
              </div>
            </div>
            <div className="pricing-features mt-5 pt-2">
              {props.pricing.features.map((feature, key) => (
                <p key={"_feature_" + key}>
                  <i className={feature.icon + " text-primary me-2"} />{" "}
                  {feature.title}
                </p>
              ))}
            </div>
            <div className="text-center mt-5">
              <h1 className="mb-0">
                <sup>
                  <small>$</small>
                </sup>
                {props.pricing.price}/
                <span className="font-size-16" style={{ color: "#000" }}>
                  {props.pricing.duration}
                </span>
              </h1>
            </div>
            <div className="d-grid mt-5">
              <Button
                onClick={props.onSubscribePress}
                className="btn btn-primary btn-block waves-effect waves-light"
                style={{
                  backgroundColor: "rgb(13, 193, 67)",
                  borderColor: "rgb(13, 193, 67)",
                }}
              >
                {props.pricing.buttonTitle}
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CardPricing.propTypes = {
  pricing: PropTypes.object,
};

export default CardPricing;
