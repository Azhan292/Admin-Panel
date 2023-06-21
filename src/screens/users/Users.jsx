import React, { useEffect, useState } from "react";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import AppLayout from "../../layout/AppLayout";
import "./users.scss";
import { Row, Col, Empty, Pagination } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export const Users = () => {
  const navigate = useNavigate();
  const [paginationFilters, setPaginationFilters] = useState({
    pageNo: 1,
    pageSize: 10,
    limitSkip: 0,
    limit: 10,
  });
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const { usersX: users, countX: countNew } = useGetAllUsers(
    updateTrigger,
    paginationFilters
  );
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  console.log("🚀 ~ file: Users.jsx:22 ~ Users ~ count:", count);
  const uniqueUsers = (data) => {
    let keys = ["firstName", "lastName", "email"];
    return data?.filter((us) => {
      if (keys.some((k) => us[k]?.toLowerCase().includes(search.toLowerCase())))
        return us;
    });
  };

  // const confirm = async (data, action) => {};

  // const cancel = (e) => {
  //   message.error("You are cancelled your changes!");
  // };
  // const numEachPage = 8;
  const handleChange = (value, pageSize) => {
    const limitSkip = value * pageSize;
    const limit = pageSize;
    setPaginationFilters({ pageNo: value, pageSize, limitSkip, limit });

    setUpdateTrigger(!updateTrigger);
  };
  useEffect(() => {
    setCount(countNew);
  }, [users]);
  return (
    <AppLayout>
      <div className="users">
        <div className="search-row">
          <h2>
            <b className="totalsnumber">Total Number of Customer {count}</b>
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
          <Row className="heading_row">
            <Col span={6}>
              <p>
                <b>First Name</b>
              </p>
            </Col>
            <Col span={6}>
              <p>
                <b>Last Name</b>
              </p>
            </Col>
            <Col span={6}>
              <p>
                <b>Email</b>
              </p>
            </Col>
            {/* <Col span={3}>
              <p>
                <b>Delete</b>
              </p>
            </Col> */}
            <Col span={3}>
              <p>
                <b>Details</b>
              </p>
            </Col>
          </Row>
        </div>

        {uniqueUsers(users)?.length > 0 ? (
          uniqueUsers(users).map((u) => {
            return (
              <Row className="row-e" key={u?._id}>
                <Col xs={24} lg={6} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>First Name</b>
                      </p>
                    </div>
                    <div className="cell-content">{u?.firstName}</div>
                  </div>
                </Col>
                <Col xs={24} lg={6} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Last Name</b>
                      </p>
                    </div>
                    <div className="cell-content">{u?.lastName}</div>
                  </div>
                </Col>
                <Col xs={24} lg={6} sm={12}>
                  <div className="e-cell">
                    <div className="cell-title">
                      <p>
                        <b>Email</b>
                      </p>
                    </div>
                    <div className="cell-content">{u?.email}</div>
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
                          navigate("/users/" + u._id, {
                            state: { userDetails: u },
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
            <Empty />
          </>
        )}
        {users.length > 0 ? (
          <Pagination
            defaultCurrent={1}
            defaultPageSize={paginationFilters.pageSize}
            onChange={handleChange}
            total={count}
            className="Pagination"
          />
        ) : null}
      </div>
    </AppLayout>
  );
};
