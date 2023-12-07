import React, { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate } from "react-router-dom";

const ProtectedRouteUserConnected = ({ children }) => {
  const { userConnected } = useContext(UserContext);
  console.log({ userConnected });
  return userConnected ? children : <Navigate to="/login" />;
};

export default ProtectedRouteUserConnected;
