import { Modal, Alert } from "antd";
import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import AlertModal from "../alertmodal/AlertModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ForgotPasswordModal = ({
  showForgotPasswordModal,
  setShowForgotPasswordModal,
}) => {
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidateAlert, setEmailValidateAlert] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  // const showModal = () => {
  //   setShowForgotPasswordModal(true);
  // };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleOk = async () => {
    const validate = validateEmail(email);
    if (validate) {
      setEmailValidateAlert(false);
      setConfirmLoading(true);
      console.log("email is ", email);
      try {
        const res = await axios.post(
          "https://picswagger-backend.uc.r.appspot.com/user/reset_password_mail",
          {
            email,
          }
        );
        console.log("hello created is ...... ", res);
        setConfirmLoading(false);
        setShowForgotPasswordModal(false);
        setEmail("");
        setShowAlertModal(true);
        navigate("/signin");
      } catch (e) {
        console.log(e);
      }
    } else {
      setEmailValidateAlert(true);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForgotPasswordModal(false);
    setEmailValidateAlert(false);
    setConfirmLoading(false);
    setEmail("");
  };

  return (
    <>
      {showAlertModal && (
        <AlertModal
          title="Password Reset"
          msg="Forgot password link is send on your email plz check inbox or spam folder"
          showAlertModal={showAlertModal}
          setShowAlertModal={setShowAlertModal}
        />
      )}
      <Modal
        title="Forgot Password"
        open={showForgotPasswordModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Forgot Password"
      >
        {emailValidateAlert && (
          <Alert
            message="Invalid Email"
            description="This is a warning notice about Email validation"
            type="error"
            showIcon
            closable
            onClose={() => setEmailValidateAlert(false)}
          />
        )}
        <p>
          <b>Email:</b>
        </p>
        <Input
          placeholder="Enter Email to forgot your password"
          onChange={(e) => setEmail(e.target.value)}
          prefix={<MailOutlined />}
          value={email}
          type="email"
        />
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
