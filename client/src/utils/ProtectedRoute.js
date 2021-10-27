import React from "react";
import { Redirect, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("token");
  // console.log("this", isAuthenticated);
  var loggedIn = false;
  if (isAuthenticated) {
    const jwt_token = jwt_decode(isAuthenticated);
    loggedIn = +new Date(+jwt_token.exp * 1000) > +new Date();
    if (!loggedIn) localStorage.removeItem("token");
  }
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
