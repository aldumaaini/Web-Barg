import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
// layouts
import VerticalLayout from "components/VerticalLayout";
import HorizontalLayout from "components/HorizontalLayout";
import NonAuthLayout from "components/NonAuthLayout";
//import { AuthProtected, AccessRoute } from "./middleware/Authmiddleware";
import Authmiddleware from "./middleware/Authmiddleware";
import { publicRoutes, privateRoutes } from "./allRoutes";

const Index = (props) => {
  const Layout = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
  }));

  function getLayout() {
    let layoutCls = VerticalLayout;
    switch (Layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const DashBoardLayoutt = getLayout();

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {privateRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={DashBoardLayoutt}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default Index;
