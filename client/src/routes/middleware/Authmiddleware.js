import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useProfile } from "hooks";
import axios from "axios";
import Loader from "components/Loader";
const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  let { userProfile } = useProfile();
  const [IsValiedToken, setIsValiedToken] = useState(false);
  const [Isloading, setIsloading] = useState(true);

  React.useEffect(() => {
    setTimeout(async () => {
      let tokenString = localStorage.getItem("authToken");

      if (tokenString === null) {
        localStorage.removeItem("authUser");
        setIsValiedToken(false);
        setIsloading(false);
      } else {
        try {
          const userToken = JSON.parse(tokenString);
          await axios
            .get("/api/isValidUser", {
              headers: { "x-auth-token": userToken },
            })
            .then((res) => {
              setIsValiedToken(true);
              setIsloading(false);
            })
            .catch((err) => {
              if (err.response) {
                if (err.response.status === 400) {
                  localStorage.removeItem("authUser");
                  localStorage.removeItem("authToken");
                } else if (err.response.status === 401) {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("authUser");
                } else {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("authUser");
                }
              } else {
                localStorage.removeItem("authToken");
                localStorage.removeItem("authUser");
              }
              setIsValiedToken(false);
              setIsloading(false);
            });
        } catch (err) {
          setIsValiedToken(false);
          setIsloading(false);
          localStorage.removeItem("authToken");
          localStorage.removeItem("authUser");
        }
      }
    }, 100);
  }, []);

  if (Isloading) return <Loader />;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !userProfile && !IsValiedToken) {
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
