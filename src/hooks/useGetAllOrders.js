import React, { useEffect, useState } from "react";

function useGetAllOrders(trigger, paginationFilters) {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState([]);
  const ress = JSON.parse(localStorage.getItem("user"));
  let token = atob(ress.token);
  const getAllOrders = async () => {
    let url = process.env.REACT_APP_BASE_URL + "order/allOrders";
    // let url = "http://localhost:5000/" + "order/allOrders";
console.log('paginationFilters======', paginationFilters);
const {limit, limitSkip, status} = paginationFilters;
    try {
      const res = await fetch(`${url}?status=${status}&limit=${limit}&limitSkip=${limitSkip}`, {
        method: "GET",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
      });
      const odrs = await res.json();
      console.log('odrs=====', odrs);
      // const sortedO = odrs.sort((a, b) => a.orderDate > b.orderDate);
      setOrders(odrs.orders);
      setCount(odrs.count);
      // console.log(sortedO);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [trigger]);
  return {orders, count};
}

export default useGetAllOrders;
