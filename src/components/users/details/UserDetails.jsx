import React, { useState } from "react";
import AppLayout from "../../../layout/AppLayout";
import "./userdetails.scss";
import { IoReturnUpBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import profile from "../../../assets/profile.png";
import { Row, Col } from "antd";
function UserDetails() {
  const { state } = useLocation();
  const { userDetails } = state;
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="user-details">
        <div className="header">
          <IoReturnUpBack className="icon" onClick={() => navigate(-1)} />
        </div>
        <div className="details">
          <div className="heading">
            <b>
              <h2>User Details</h2>
            </b>
            <div className="orders">
              <button
                onClick={() =>
                  navigate("/users/orders/" + userDetails._id, {
                    state: { userDetails, status: "order" },
                  })
                }
              >
                Orders
              </button>
              {/* <button>Drafts Orders</button> */}
              <button
                onClick={() =>
                  navigate("/users/orders/" + userDetails._id, {
                    state: { userDetails, status: "approve" },
                  })
                }
              >
                Drafts/Approve Orders
              </button>
            </div>
          </div>
          <div className="details-card">
            <div className="heading-img">
            </div>
            <div className="heading">
              <img src={profile} alt="" />
            </div>
            <Row>
              <Col lg={12} xs={24}>
                <div className="content-x">
                  <h3>
                    <b>First Name:</b>
                  </h3>
                  <h4>{userDetails?.firstName}</h4>
                </div>
                <div className="content-x">
                  <h3>
                    <b>Last Name:</b>
                  </h3>
                  <h4>{userDetails?.lastName}</h4>
                </div>
                <div className="content-x">
                  <h3>
                    <b>Email:</b>
                  </h3>
                  <h4>{userDetails?.email}</h4>
                </div>
              </Col>
              
            </Row>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default UserDetails;
