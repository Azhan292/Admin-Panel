import React, { useState } from "react";
// import useGetAllUsers from "../../hooks/useGetAllUsers";
import AppLayout from "../../layout/AppLayout";
import { allorders } from "./allOrderDetails/data";
import "./allorders.scss";
import {
  Row,
  Col,
  Empty,
  Segmented,
  Pagination,
} from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SimpleLoading from "../../components/Loading/Loader";
// import axios from "axios";
import { FcApproval, FcPaid, FcMindMap } from "react-icons/fc";
import { useQuery, gql } from '@apollo/client';



function AllOrders() {
  // const user = JSON.parse(localStorage.getItem("user"));
  // const [form] = Form.useForm();

  // const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [search, setSearch] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("order");
  const [paginationFilters, setPaginationFilters] = useState({
    pageNo: 1,
    pageSize: 10,
    limitSkip: 0,
    limit: 10,
    status:"order"
  });
  console.log("🚀 ~ file: AllOrders.jsx:47 ~ AllOrders ~ paginationFilters:", paginationFilters)

  const [count, setCount] = useState(0);
  console.log("🚀 ~ file: AllOrders.jsx:52 ~ AllOrders ~ count:", count);

  const handleChange = (value, pageSize) => {
    const limitSkip = value * pageSize;
    const limit = pageSize;
    const status = paginationFilters.status;
    setPaginationFilters({ pageNo: value, pageSize, limitSkip, limit, status });
    console.log(
      "🚀 ~ file: AllOrders.jsx:55 ~ handleChange ~ value:",
      value,
      pageSize
    );
    setUpdateTrigger(!updateTrigger);
  };
  const uniqueOrders = (data) => {
    let keys = ["name", "orderStatus"];
    return data?.filter((ps) => {
      if (
        keys?.some((k) => ps[k]?.toLowerCase()?.includes(search?.toLowerCase()))
      )
        return ps;
    });
  };
//  const customerId = "647d75ca1fa9ca0b67d140e2";
//   const { loading, error, data } = useQuery(Customer, {
//     variables: { id: customerId },
//   });
//   console.log("🚀 ~ file: AllOrders.jsx:76 ~ AllOrders ~ data:", data)
  
//     if (loading) {
//       return <p>Loading...</p>;
//     }
  
//     if (error) {
//       return <p>Error: {error.message}</p>;
//     }
  

const handleChangeStatus = (e) =>{
   setSortOrder(e)
   const limitSkip = paginationFilters.limitSkip;
   const limit = paginationFilters.limit;
   setPaginationFilters({status: e, limitSkip, limit})
   setUpdateTrigger(!updateTrigger);
}
  
  return (
    <AppLayout>
      <div className="all-orders">
        <div className="search-row">
          <h2>
            <b className="totalsnumber">
              Total Number of Orders ({allorders?.length})
            </b>
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
        <Row className="Segmented">
          <Segmented
            className="Status"
            onChange={handleChangeStatus}
            options={[
              {
                label: (
                  <div className="d-flex">
                    <FcApproval className="icon-d" />
                    Successfull Orders
                  </div>
                ),
                value: "order",
              },
              {
                label: (
                  <div className="d-flex">
                    <FcMindMap className="icon-d" />
                    Approved Orders
                  </div>
                ),
                value: "approve",
              },
              {
                label: (
                  <div className="d-flex">
                    <FcPaid className="icon-d" />
                    Pendding Orders
                  </div>
                ),
                value: "zenprint",
              },
            ]}
          />
        </Row>

        <div className="header-row">
          <Row className="heading_row">
            <Col span={2}>
              <p>
                <b>Date</b>
              </p>
            </Col>
            <Col span={2}>
              <p>
                <b>Order Id</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>User Name</b>
              </p>
            </Col>
            <Col span={2}>
              <p>
                <b>Quantity</b>
              </p>
            </Col>
            <Col span={5}>
              <p>
                <b>Ship To Name</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Order Type</b>
              </p>
            </Col>
            <Col span={2}>
              <p>
                <b>Details</b>
              </p>
            </Col>
          </Row>
        </div>

        {uniqueOrders(allorders)?.length > 0 ? (
          <>
            {uniqueOrders(allorders).map((p) => {
              return (
                <Row className="row-e" key={p?.id}>
                  <Col xs={24} lg={2} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Date</b>
                        </p>
                      </div>
                      <div className="cell-content">{p?.date}</div>
                    </div>
                  </Col>
                  <Col xs={24} lg={2} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Order ID</b>
                        </p>
                      </div>
                      <div className="cell-content">{p?.id}</div>
                    </div>
                  </Col>
                  <Col xs={24} lg={3} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>User Name</b>
                        </p>
                      </div>
                      <div className="cell-content">{p?.name}</div>
                    </div>
                  </Col>
                  <Col xs={24} lg={2} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Quantity</b>
                        </p>
                      </div>
                      <div className="cell-content">
                        <span>{p?.quintity}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} lg={5} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Ship To Name</b>
                        </p>
                      </div>
                      <div className="cell-content">{p?.address}</div>
                    </div>
                  </Col>
                  <Col xs={24} lg={3} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Order Type</b>
                        </p>
                      </div>
                      <div className="cell-content">{p?.type}</div>
                    </div>
                  </Col>
                  {/*<Col xs={24} lg={2} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>ZenDirect Order</b>
                        </p>
                      </div>
                      <div className="cell-content">
                        <span style={{ width: "50%" }}>
                          {p?.status === "order" ? (
                            <span>
                              {p?.orderPlaceToZendirect ? (
                                <span>Success</span>
                              ) : !p?.updatedAt ||
                                moment(p?.updatedAt)
                                  .add(10, "minutes")
                                  .format("lll") < moment().format("lll") ? (
                                <Button
                                  onClick={() => {
                                    reorderToZendirect(p);
                                  }}
                                >
                                  Order
                                </Button>
                              ) : (
                                <Button disabled>Processing</Button>
                              )}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </span>
                         <BiEdit
                        className="icon"
                        onClick={() => {
                          setShowModal(true);
                          setUpdatedOrder(p);
                        }}
                      /> 
                      </div>
                    </div>
                  </Col>*/}
                  <Col xs={24} lg={2} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Order</b>
                        </p>
                      </div>
                      <div className="cell-content">
                        <span
                          className="view-order"
                          style={{ marginLeft: "10px" }}
                          onClick={() =>
                            navigate("/all-orders/details/" + p.id, {
                              state: { orderDetails: p },
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
            })}
            <Pagination
              defaultCurrent={1}
              defaultPageSize={paginationFilters.pageSize}
              // onShowSizeChange={onShowSizeChange}
              onChange={handleChange}
              total={count}
              className="Pagination"
            />
          </>
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

export default AllOrders;
