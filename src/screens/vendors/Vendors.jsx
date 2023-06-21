import React, { useState } from "react";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import AppLayout from "../../layout/AppLayout";
import { allVendors } from "./data.js";
import "./vendors.scss";
import { message, Row, Col, Empty, Popconfirm } from "antd";
import { AiOutlineSearch, AiTwotoneDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SimpleLoading from "../../components/Loading/Loader";
import axios from "axios";
import { useSelector } from "react-redux";
import { storageUrlToPath, deleteStorageFile } from "../../APIs/Apis";
function Vendors() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const products = useGetAllProducts();

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
    if (products.length > 0) {
    } else {
      setShowLoading(false);
    }
  }, 1000);
  return (
    <AppLayout>
      {showLoading ? <SimpleLoading /> : null}

      <div className="vendors">
        <div className="search-row">
          <h2>
            <b className="totalsnumber">
              Total Number of Vendors({allVendors?.length})
            </b>
          </h2>
          {/* <button onClick={() => navigate("/vendors/new-product")}>
            Add New Vender
          </button> */}
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
                <b>Email</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Service Plan</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Total Products</b>
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

        {uniqueProducts(allVendors)?.length > 0 ? (
          uniqueProducts(allVendors).map((p) => {
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
                        <b>Email</b>
                      </p>
                    </div>
                    <div className="cell-content">{p?.email}</div>
                  </div>
                </Col>
                <Col xs={24} lg={3} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Service Plan</b>
                      </p>
                    </div>

                    <div className="cell-content">{p?.servicePlan}</div>
                  </div>
                </Col>
                <Col xs={24} lg={3} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Total Products</b>
                      </p>
                    </div>
                    <div className="cell-content">{p?.product.length}</div>
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
                          navigate("/vendors/" + p.id, {
                            state: { productDetails: p },
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

export default Vendors;
