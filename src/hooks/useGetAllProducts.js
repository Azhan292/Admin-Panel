import React, { useEffect, useState } from "react";
function useGetAllProducts() {
  const ress = JSON.parse(localStorage.getItem("user"));
  let token = atob(ress.token);
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    let url = process.env.REACT_APP_BASE_URL + "product/allProducts";
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
      setProducts(ps);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return products;
}

export default useGetAllProducts;
