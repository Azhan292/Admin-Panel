import { Descriptions } from "antd";
// import moment from "moment";
import React from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "../../../layout/AppLayout";
function AllOrderDetails() {
  const { state } = useLocation();
  // console.log(useLocation());
  const { orderDetails } = state;
  // console.log('orderd details check ', orderDetails)


  return (
    <AppLayout>
    <br/><br/><br/>
      <Descriptions title="Order Info" bordered>
        <Descriptions.Item label="Order Date">
          {orderDetails.date}
        </Descriptions.Item>
        <Descriptions.Item label="Order Type">
          {orderDetails?.orderStatus}
        </Descriptions.Item>
        <Descriptions.Item label="Order Number">
          {orderDetails?.id}
        </Descriptions.Item>
       
        
      </Descriptions>

 
    </AppLayout>
  );
}

export default AllOrderDetails;
