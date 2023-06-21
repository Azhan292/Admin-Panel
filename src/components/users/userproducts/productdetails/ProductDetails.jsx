import React from "react";
import AppLayout from "../../../../layout/AppLayout";
import "./productdetails.scss";
import { IoReturnUpBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import profile from "../../../../assets/profile.png";
import { Row, Col } from "antd";
function ProductDetails() {
  
  const { state } = useLocation();
  const { productDetails } = state;
  console.log(productDetails);
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="product-details">
        <div className="header">
          <IoReturnUpBack className="icon" onClick={() => navigate(-1)} />
        </div>
        <div className="details">
          <div className="heading">
            <h2>Product Details</h2>
          </div>
          <div className="details-card">
            <div className="heading-img"></div>
            <div className="heading">
              <img src={profile} alt="" />
            </div>
            <Row>
              <Col lg={12} xs={24}>
                <div className="content-x">
                  <h3>
                    <b>Name:</b>
                  </h3>
                  <h4>{productDetails?.name}</h4>
                </div>
                <div className="content-x">
                  <h3>
                    <b>Email:</b>
                  </h3>
                  <h4>{productDetails?.email}</h4>
                </div>
                <div className="content-x">
                  <h3>
                    <b>Service Plan:</b>
                  </h3>
                  <h4>{productDetails?.servicePlan}</h4>
                </div>
                <div className="content-x">
                  <h3>
                    <b>Total product:</b>
                  </h3>
                  <h4>{productDetails?.product.length}</h4>
                </div>
              </Col>
              <div className="content-xy">
                <button
                  onClick={() =>
                    navigate("/vendors/" + productDetails.id + "/product", {
                      state: { vendorProductDetails: productDetails },
                    })
                  }
                >
                  View All Product
                </button>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProductDetails;
