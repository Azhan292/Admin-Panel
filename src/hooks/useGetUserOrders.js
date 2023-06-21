import React, { useEffect, useState } from "react";
function useGetUserOrders(id, token) {
  const [userOrders, setUserOrders] = useState([]);
  const getAllUserOrders = async () => {
    let url = process.env.REACT_APP_BASE_URL + "order/allUserOrders";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
        body: JSON.stringify({ userId: id }),
      });
      const odrs = await res.json();
      setUserOrders(odrs);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getAllUserOrders();
  }, []);
  return userOrders;
}

export default useGetUserOrders;
