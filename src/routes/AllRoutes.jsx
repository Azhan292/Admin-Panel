import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/login/Login";
import UserDetails from "../components/users/details/UserDetails";
import UserOrders from "../components/users/orders/UserOrders";
import NewPromo from "../components/users/promo/newpromo/NewPromo";
import NewProduct from "../components/users/userproducts/newproduct/NewProduct";
import ProductDetails from "../components/users/userproducts/productdetails/ProductDetails";
import AllOrderDetails from "../screens/allorders/allOrderDetails/AllOrderDetails";
import AllOrders from "../screens/allorders/AllOrders";
import Promos from "../screens/promos/Promos";
import PubRoute from "./PubRoutes";
import PvtRoute from "./PvtRoutes";
import { Users } from "../screens/users/Users";
import VendorProducts from "../components/users/vendorsProduct/venderProduct";
import VendorDetails from "../components/users/vendorsProduct/venderDetails";
import Vendors from "../screens/vendors/Vendors";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <PubRoute>
              <Login />
            </PubRoute>
          }
        />
        <Route path="login" element={<Login />}></Route>
        <Route
          path="users"
          element={
            <PvtRoute>
              <Users />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="vendors"
          element={
            <PvtRoute>
              <Vendors/>
            </PvtRoute>
          }
        ></Route>
        <Route
          path="users/:id"
          element={
            <PvtRoute>
              <UserDetails />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="users/orders/:id"
          element={
            <PvtRoute>
              <UserOrders />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="vendors/:id"
          element={
            <PvtRoute>
              <ProductDetails />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="vendors/:id/product"
          element={
            <PvtRoute>
              <VendorProducts />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="vendors/products/:id"
          element={
            <PvtRoute>
              <VendorDetails />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="vendors/new-product"
          element={
            <PvtRoute>
              <NewProduct />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="*"
          element={
            <PubRoute>
              <Login />
            </PubRoute>
          }
        ></Route>
        <Route
          path="promos"
          element={
            <PvtRoute>
              <Promos />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="all-orders"
          element={
            <PvtRoute>
              <AllOrders />
            </PvtRoute>
          }
        ></Route>
        <Route
          path="all-orders/details/:id"
          element={
            <PvtRoute>
              <AllOrderDetails />
            </PvtRoute>
          }
        ></Route>

        <Route
          path="promos/new-promo"
          element={
            <PvtRoute>
              <NewPromo />
            </PvtRoute>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default AllRoutes;
