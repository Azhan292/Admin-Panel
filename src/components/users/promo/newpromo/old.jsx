import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../../layout/AppLayout";
import FullPageLoading from "../../../Loading/FullPageLoading";
import { Button, Form, Input, Space, DatePicker } from "antd";
import { saveCoupon } from "../../../../APIs/DatabaseApis";
import moment from "moment";
function NewPromo() {
  const [showLoading, setShowLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    let tag = values.id.split(" ").join("").toUpperCase();
    setShowLoading(true);
    let timeExpiry = new Date(values.expiry_date).getTime();

    try {
      const res = await saveCoupon({
        id: tag,
        name: values.name,
        amount_off: values.amount,
        redeem_by: timeExpiry / 1000,
      });
      if (res) {
        setShowLoading(false);
        form.resetFields();
        navigate("/promos");
      } else {
        setShowLoading(false);
      }
    } catch (e) {
      setShowLoading(false);
    }
    try {
    } catch (e) {
      setShowLoading(false);
    }
  };
  return (
    <AppLayout>
      {showLoading ? <FullPageLoading /> : null}
      <div className="form">
        <div>
          <h3>Promo Details</h3>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Enter Attractive Coupon Tag ( This tag will be used by customers )"
            name="id"
            rules={[
              {
                required: true,
                message: "Coupon Tag is required",
              },
            ]}
          >
            <Input
              className="input-primary"
              placeholder="Coupon Tag"
              // onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input className="input-primary" placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Amount Off (In Cents)"
            name="amount"
            rules={[
              {
                required: true,
                message: "Amount is required",
              },
            ]}
          >
            <Input
              className="input-primary"
              placeholder="Amount (In Cents)"
              type="number"
              min={50}
            />
          </Form.Item>
          <Form.Item
            label="Pic Expiry Date"
            name="expiry_date"
            rules={[
              {
                required: true,
                message: "Promo expiry date",
              },
            ]}
          >
            <DatePicker
              disabledDate={(current) => {
                let customDate = moment().format("YYYY-MM-DD");
                return current && current < moment(customDate, "YYYY-MM-DD");
              }}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                htmlType="submit"
                style={{ backgroundColor: "green", color: "white" }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </AppLayout>
  );
}

export default NewPromo;
