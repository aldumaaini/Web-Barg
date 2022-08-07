import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
// reactstrap
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//i18n
import { withTranslation } from "react-i18next";

// import images
// logo white small and large
import logosm from "../../assets/images/logobw-horizantal.png";
import logo from "../../assets/images/logobw-horizantal.png";
import DatePicker from "react-date-picker";
//logo color small and dark
import logoColor from "../../assets/images/logo-dark.png";
import logoColorSm from "../../assets/images/logo-sm.png";

const Header = (props) => {
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoColorSm} alt="" className="logo-small-size" />
                </span>
                <span className="logo-lg">
                  <img src={logoColor} alt="" height="17" />
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    src={logosm}
                    alt=""
                    style={{ width: 120, height: 50 }}
                    className="logo-small-size"
                  />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="" height="18" />
                </span>
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              className="btn btn-sm me-2 font-size-24 d-lg-none header-item waves-effect waves-light"
              id="vertical-menu-btn"
            >
              <i className="mdi mdi-menu"></i>
            </button>
          </div>
          <div className="d-flex">
            <LanguageDropdown />
            <div className="dropdown d-none d-lg-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                onClick={() => {
                  toggleFullscreen();
                }}
                data-bs-toggle="fullscreen"
              >
                <i className="mdi mdi-fullscreen"></i>
              </button>
            </div>

            <ProfileMenu />
            <div className="dropdown d-inline-block">
              <button
                onClick={() => {
                  props.showRightSidebarAction(!props.showRightSidebar);
                }}
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="mdi mdi-cog-outline"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header));
