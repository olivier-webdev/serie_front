import React, { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const { userConnected } = useContext(UserContext);
  console.log({ userConnected });
  return userConnected && userConnected.admin === 1 ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRouteAdmin;
