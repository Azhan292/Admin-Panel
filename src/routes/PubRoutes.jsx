import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Login from "../components/auth/login/Login";
function PubRoute() {
  // const { user } = useSelector((state) => state.user);

  const sdata = JSON.parse(localStorage.getItem("user"));
  let user = sdata?.data;
  return user && user?.email ? <Navigate to="users" /> : <Login />;
}

export default PubRoute;
