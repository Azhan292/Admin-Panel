import React, { useEffect, useState } from "react";
function useGetAllCoupons(flag) {
  const ress = JSON.parse(localStorage.getItem("user"));
  let token = atob(ress.token);
  const [coupons, setCoupons] = useState([]);

  const getAllCoupons = async () => {
    // let url = process.env.REACT_APP_BASE_URL + "stripe/retrieveAllCoupon";
    let url = process.env.REACT_APP_BASE_URL + "coupon/allCoupon";
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
        // body: JSON.stringify({ token }),
      });
      const ps = await res.json();
      // console.log(ps);
      setCoupons(ps);
      // setCoupons(ps.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getAllCoupons();
  }, [flag]);
  return coupons;
}

export default useGetAllCoupons;
