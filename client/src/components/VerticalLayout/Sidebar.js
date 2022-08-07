import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useProfile } from "hooks";
//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import SidebarContentUser from "./SidebarContentUser";

const Sidebar = (props) => {
  const { userProfile } = useProfile();
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {userProfile?.role === "user" ? (
            <SidebarContentUser />
          ) : (
            <SidebarContent />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
