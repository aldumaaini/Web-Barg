import React from "react";

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-5">
      <h3>{title}</h3>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </div>
  );
};

export default AuthHeader;
