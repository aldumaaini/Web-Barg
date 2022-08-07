import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
} from "../../store/actions";
import { useProfile } from "hooks";
// Other Layout related Component
import Navbar from "./Navbar";
import NavbarUser from "./NavbarUser";
import Header from "./Header";
import Footer from "./Footer";
import Rightbar from "../CommonForBoth/Rightbar";

const Layout = (props) => {
  const { userProfile } = useProfile();
  const [isMenuOpened, setIsMenuOpend] = useState(false);
  /*constructor(props) {
    super(props);
    this.state = {
      isMenuOpened: false,
    };
  }*/
  useEffect(() => {
    window.scrollTo(0, 0);

    const title = props.location.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2);

    document.title = currentage + " | Whatsapp Barg";

    props.changeLayout("horizontal");
    if (props.topbarTheme) {
      props.changeTopbarTheme(props.topbarTheme);
    }
    if (props.layoutWidth) {
      props.changeLayoutWidth(props.layoutWidth);
    }
  }, []);

  /**
   * Opens the menu - mobile
   */
  const openMenu = () => {
    setIsMenuOpend(!isMenuOpened);
    //this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          theme={props.topbarTheme}
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
        />
        {userProfile.role === "admin" ? (
          <Navbar menuOpen={isMenuOpened} />
        ) : (
          <NavbarUser menuOpen={isMenuOpened} />
        )}

        <div className="main-content">{props.children}</div>
        <Footer />
      </div>

      {props.showRightSidebar ? <Rightbar /> : null}
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
};

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};
export default connect(mapStatetoProps, {
  changeTopbarTheme,
  changeLayout,
  changeLayoutWidth,
})(withRouter(Layout));
