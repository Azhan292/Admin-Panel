import React, { useState } from "react";
import AppLayout from "../../layout/AppLayout";
import "./promos.scss";
import { message, Row, Col, Empty, Popconfirm } from "antd";
import { AiOutlineSearch, AiTwotoneDelete } from "react-icons/ai";
// import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SimpleLoading from "../../components/Loading/Loader";
import axios from "axios";
import { useSelector } from "react-redux";
// import useGetAllCoupons from "../../hooks/useGetAllCoupons";

function Promos() {
  const { user } = useSelector((state) => state.user);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const coupons = []
  console.log('coupons data',coupons);
  const [search, setSearch] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const uniqueCoupons = (data) => {
    let keys = ["name"];
    return data.filter((ps) => {
      if (keys.some((k) => ps[k].toLowerCase().includes(search.toLowerCase())))
        return ps;
    });
  };
  const confirm = async (data, action) => {
    setShowLoading(true);
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BASE_URL + `coupon/deleteCoupon/${data._id}`,
        {
          headers: {
            Authorization: `jwt ${window.atob(user.token)}`,
          },
        }
      );
  //     // const res = await axios.delete(
  //     //   process.env.REACT_APP_BASE_URL + `stripe/deleteCoupon?code=${data.id}`,
  //     //   {
  //     //     headers: {
  //     //       Authorization: `jwt ${window.atob(user.token)}`,
  //     //     },
  //     //   }
  //     // );
      if (res.data.status) {
        message.success(res.data.msg);
        setFlag(!flag);
      } else {
        message.error(res.data.msg);
      }

      setShowLoading(false);
    } catch (e) {
      console.log(e);
      setShowLoading(false);
    }
  };

  const cancel = (e) => {
    message.error("You are cancelled your changes!");
  };
  setTimeout(() => {
    if (coupons.length > 0) {
    } else {
      setShowLoading(false);
    }
  }, 1000);
  return (
    <AppLayout>
      {showLoading ? <SimpleLoading /> : null}

      <div className="payments">
        <div className="search-row">
          <h2>
            <b className="totalsnumber1">
              Total Number of Coupons ({coupons.length})
            </b>
          </h2>
          <button onClick={() => navigate("/promos/new-promo")}>
            Add Payment
          </button>
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
            <Col span={4}>
              <p>
                <b>Tag Name</b>
              </p>
            </Col>
            <Col span={2}>
              <p>
                <b>Amount</b>
              </p>
            </Col>
            <Col span={6}>
              <p>
                <b>Expiry Date</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Active Status</b>
              </p>
            </Col>
            <Col span={3}>
              <p>
                <b>Delete</b>
              </p>
            </Col>
          </Row>
        </div>

        {uniqueCoupons(coupons)?.length > 0 ? (
          uniqueCoupons(coupons).map((p) => {
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
                <Col xs={24} lg={4} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Tag Name</b>
                      </p>
                    </div>
                    <div className="cell-content">{p?.code}</div>
                  </div>
                </Col>
                <Col xs={24} lg={2} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Amount</b>
                      </p>
                    </div>
                    <div className="cell-content">${p?.amount / 100}</div>
                  </div>
                </Col>

                <Col
                  xs={24}
                  lg={6}
                  sm={12}
                  style={{ border: "1px solid black" }}
                >
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Expiry Date</b>
                      </p>
                    </div>
                    <div className="cell-content">
                      {new Date(p.validUntil).toDateString()}
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={3} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Active Status</b>
                      </p>
                    </div>
                    <div className="cell-content">
                      {new Date().getTime() > new Date(p.validUntil).getTime()
                        ? "Expired"
                        : "Active"}
                    </div>
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

export default Promos;
