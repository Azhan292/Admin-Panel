import { Descriptions } from "antd";
// import moment from "moment";
import React from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "../../../layout/AppLayout";
function VendorDetails() {
  const { state } = useLocation();
  // console.log(useLocation());
  const { product } = state;
  // console.log('orderd details check ', orderDetails)


  return (
    <AppLayout>
    <br/><br/><br/>
      <Descriptions title="Order Info" bordered>
        <Descriptions.Item label="Order Date">
          {product.name}
        </Descriptions.Item>
        <Descriptions.Item label="Order Type">
          {product.type}
        </Descriptions.Item>
        <Descriptions.Item label="Order Number">
          {product?.id}
        </Descriptions.Item>
       
        
      </Descriptions>

 
    </AppLayout>
  );
}

export default VendorDetails;
