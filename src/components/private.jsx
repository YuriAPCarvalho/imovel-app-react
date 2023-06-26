import React from "react";
import { useAuth } from "../contexts/auth";
import { Route, Navigate } from "react-router-dom";

const Private = ({ path, element }) => {
  const { signed } = useAuth();

  if (signed) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Private;
