import React from "react";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PvtRoute({ children }) {
  const sdata = JSON.parse(localStorage.getItem("user"));
  let user = sdata?.data;

  return user && user?.email ? children : <Navigate to="/" />;
}

export default PvtRoute;
