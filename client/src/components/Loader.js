import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div
      className="loader-container"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="status">
        <Spinner color="primary" />
      </div>
    </div>
  );
};

export default Loader;
