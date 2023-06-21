import { Button, Modal } from "antd";
import React from "react";

const AlertModal = ({ title, msg, showAlertModal, setShowAlertModal }) => {
  const handleOk = () => {
    setShowAlertModal(false);
  };

  const handleCancel = () => {
    setShowAlertModal(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={showAlertModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{msg}</p>
      </Modal>
    </>
  );
};

export default AlertModal;
