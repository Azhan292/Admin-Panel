import React, { useState } from "react";
import useGetUserOrders from "../../../hooks/useGetUserOrders";
import AppLayout from "../../../layout/AppLayout";
import "./orders.scss";
import { Row, Col, Empty, Pagination } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
// import FullPageLoading from "../../Loading/FullPageLoading";
import moment from "moment";
function UserOrders() {
  const { state } = useLocation();
  const userAuth = JSON.parse(localStorage.getItem("user"));
  let token = window.atob(userAuth.token);
  // const navigate = useNavigate();
   const status = state?.status;
  const orders = useGetUserOrders(state?.userDetails._id, token,);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState({ minVal: 0, maxVal: 8 });
  // const [loadState, setLoadState] = useState(false);
  const uniqueUserOrders = (data) => {
    let keys = ["albumName", "albumCoverName"];
    return data.filter((us) => {
      if (
        keys.some((k) => us[k]?.toLowerCase()?.includes(search?.toLowerCase()))
      )
        return us;
    });
  };
  const numEachPage = 8;
  const handleChange = (value) => {
    setCount({
      minVal: (value - 1) * numEachPage,
      maxVal: value * numEachPage,
    });
  };

  return (
    <AppLayout>
      <div className="users">
        <div className="search-row">
          <h2>
            <b>Total Number of Orders ({orders?.filter((v)=>v.status===status).length})</b>
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
            <Col span={5}>
              <p>
                <b>Cover Name</b>
              </p>
            </Col>
            <Col span={4}>
              <p>
                <b>Size</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Pages</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Status</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Date</b>
              </p>
            </Col>
          </Row>
        </div>

        {uniqueUserOrders(orders)?.length > 0 ? (
          uniqueUserOrders(orders)?.filter((v)=>v.status===status)
            .slice(count.minVal, count.maxVal)
            .map((u) => {
              return (
                <Row className="row-e" key={u?._id}>
                  <Col xs={24} lg={6} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Name</b>
                        </p>
                      </div>
                      <div className="cell-content">{u?.albumName}</div>
                    </div>
                  </Col>
                  <Col xs={24} lg={5} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Cover Name</b>
                        </p>
                      </div>
                      <div className="cell-content">
                        {u?.albumCoverName
                          ? u.albumCoverName
                          : "no cover name available"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} lg={4} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Size</b>
                        </p>
                      </div>
                      <div className="cell-content">{u?.size}</div>
                    </div>
                  </Col>
                  <Col xs={24} lg={3} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Pages</b>
                        </p>
                      </div>
                      <div className="cell-content">{u?.pages}</div>
                    </div>
                  </Col>
                  <Col xs={24} lg={3} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Status</b>
                        </p>
                      </div>
                      <div className="cell-content">
                        {u.status == "order" ? u.orderStatus : u.status}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} lg={3} sm={12}>
                    <div className="e-cell">
                      <div className="cell-title">
                        <p>
                          <b>Date</b>
                        </p>
                      </div>
                      <div className="cell-content">
                        {u?.orderDate
                          ? moment(u.orderDate).format("DD-MM-YYYY")
                          : moment(u.createdAt).format("DD-MM-YYYY")}
                      </div>
                    </div>
                  </Col>
                </Row>
              );
            })
        ) : (
          <>
            <Empty />
          </>
        )}
        {orders.length > 0 ? (
          <Pagination
            defaultCurrent={1}
            defaultPageSize={numEachPage}
            onChange={handleChange}
            total={uniqueUserOrders(orders).length}
          />
        ) : null}
      </div>
    </AppLayout>
  );
}

export default UserOrders;
