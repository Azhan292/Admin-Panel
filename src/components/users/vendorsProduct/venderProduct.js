import React, { useState } from "react";
import AppLayout from "../../../layout/AppLayout";
// import pic1 from "../../assets/pic1.png"
import "./vendorproduct.scss";
import { message, Row, Col, Empty, Popconfirm } from "antd";
import { AiOutlineSearch, AiTwotoneDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleLoading from "../../../components/Loading/Loader";
import axios from "axios";
import { storageUrlToPath, deleteStorageFile } from "../../../APIs/Apis";
import { useSelector } from "react-redux";
import { IoReturnUpBack } from "react-icons/io5";
function VendorProducts() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
//   const products = useGetAllProducts();
const { state } = useLocation();
  const { vendorProductDetails } = state;
  const {product} = vendorProductDetails;
  const [search, setSearch] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const uniqueProducts = (data) => {
    let keys = ["name"];
    return data.filter((ps) => {
      if (keys.some((k) => ps[k].toLowerCase().includes(search.toLowerCase())))
        return ps;
    });
  };
  const confirm = async (data, action) => {
    console.log("data is ", data);
    console.log("user is is ", user);
    setShowLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "product/deleteProduct",
        {
          id: data._id,
          token: window.atob(user.token),
        }
      );
      deleteStorageFile(storageUrlToPath(data.image));
      setShowLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      setShowLoading(false);
    }
  };

  const cancel = (e) => {
    message.error("You are cancelled your changes!");
  };
  setTimeout(() => {
    if (product.length > 0) {
    } else {
      setShowLoading(false);
    }
  }, 1000);
  return (
    <AppLayout>

      <div className="products">
      <div className="header">
          <IoReturnUpBack className="icon" onClick={() => navigate(-1)} />
        </div>
        <div className="search-row">
          <h2>
            <b>Total Number of Product({product?.length})</b>
          </h2>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <AiOutlineSearch className="icon" />
            <button>Search</button>
          </div>
        </div>
        <div className="header-row">
          <Row className="">
            <Col span={6}>
              <p>
                <b>Name</b>
              </p>
            </Col>
            <Col span={6}>
              <p>
                <b>Price</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Discount</b>
              </p>
            </Col>
            <Col span={3}>
            <p>
              <b>Type</b>
            </p>
          </Col>
            <Col span={3}>
              <p>
                <b>Delete</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Details</b>
              </p>
            </Col>
          </Row>
        </div>

        {uniqueProducts(product)?.length > 0 ? (
          uniqueProducts(product).map((p) => {
            return (
              <Row className="row-e" key={p?.id}>
                <Col xs={24} lg={6} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Name</b>
                      </p>
                    </div>
                    
                    <div className="cell-content">{p?.name}</div>
                  </div>
                </Col>
                <Col xs={24} lg={6} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Price</b>
                      </p>
                    </div>
                    <div className="cell-content">{p?.price}</div>

                    
                  </div>
                </Col>
                <Col xs={24} lg={3} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Discount</b>
                      </p>
                    </div>
                  
                    <div className="cell-content">{p?.dic}</div>
                  </div>
                </Col>
                <Col xs={24} lg={3} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Type</b>
                      </p>
                    </div>
                  
                    <div className="cell-content">{p?.type}</div>
                  </div>
                </Col>
                <Col xs={24} lg={3} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Delete</b>
                      </p>
                    </div>
                    <div className="cell-content">
                      <Popconfirm
                        title="Are you sure about the delete action?"
                        onConfirm={() => confirm(p, "del")}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                      >
                        <AiTwotoneDelete className="icon del" />
                      </Popconfirm>
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={3} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Order</b>
                      </p>
                    </div>
                    <div className="cell-content">
                      <span
                        className="view-order"
                        onClick={() =>
                          navigate("/vendors/products/" + p.id, {
                            state: { product: p },
                          })
                        }
                      >
                        View
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })
        ) : (
          <>
            {showLoading ? <SimpleLoading /> : null}
            <Empty />
          </>
        )}
      </div>
    </AppLayout>
  );
}

export default VendorProducts;
