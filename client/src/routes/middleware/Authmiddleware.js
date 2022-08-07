import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useProfile } from "hooks";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  let { userProfile } = useProfile();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !userProfile) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default Authmiddleware;
