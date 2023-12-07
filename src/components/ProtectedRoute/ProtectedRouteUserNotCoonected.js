import React, { useContext } from "react";
import { UserContext } from "../../context";
import { Navigate } from "react-router-dom";

const ProtectedRouteUserNotConnected = ({ children }) => {
  const { userConnected } = useContext(UserContext);
  console.log({ userConnected });
  return !userConnected ? children : <Navigate to="/profile" />;
};

export default ProtectedRouteUserNotConnected;
