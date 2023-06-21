import React, { useState } from "react";
import "./layout.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { MenueItems } from "./menueItems";
import profile from "../assets/profile.png";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {message, Popconfirm } from "antd";
import { userSuccess } from "../redux/slices/userSlice";

function AppLayout({ children }) {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);

  const confirm = () => {
    message.info("You are Logout now.");
    setIsMenu(false);
    let userAuth = JSON.parse(localStorage.getItem("user"));
    if (userAuth) {
      localStorage.clear();
      userSuccess({});
      navigate("/login");
    } else {
    }
  };
  const onCancel = () => {
    setIsMenu(false);
  };
  return (
    <div className="layout">
      <div className="topbar">
        <div className="profile">
          <div className="profile-desc">
            <div className="new-Admin">
            <img src={profile} alt=""/> <p>Admin</p>
            <RiLogoutCircleRLine
              className="icon"
              onClick={() => {
                setIsMenu(!isMenu);
              }}
            />
            <Popconfirm
              placement="bottomLeft"
              title="Confirm Logout ?"
              onConfirm={confirm}
              onCancel={onCancel}
              okText="Yes"
              cancelText="No"
              open={isMenu}
            ></Popconfirm>
            </div>
          </div>
        </div>

        {/* {isMenu && <div className="menu">dd</div>} */}
      </div>
      <div className="sidebar">
        <div className="logo"></div>
        <div className="sidebar-menu">
          {MenueItems.map((link) => {
            return (
              <NavLink to={link.path} className="nav-links" key={link.key}>
                {link.icon}
                <p>{link.label}</p>
              </NavLink>
            );
          })}
        </div>
       
      </div>
      <div className="content">
        <div className="app-container">{children}</div>
      </div>
    </div>
  );
}
debugger
export default AppLayout;
