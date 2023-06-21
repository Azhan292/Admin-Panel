import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../../../layout/AppLayout";
import FullPageLoading from "../../../Loading/FullPageLoading";
import "./promo.scss";
import {
  Button,
  Form,
  Input,
  Space,
  Row,
  Col,
  DatePicker,
  message,
  Switch,
  Select,
} from "antd";
import { saveCoupon } from "../../../../APIs/DatabaseApis";

import moment from "moment";
import useAllInfluencer from "../../../../hooks/useAllInfluencer";
import {useDispatch } from "react-redux";
// import {influencerfun} from '../../../../redux/slices/influencer'
const { Option } = Select;
function NewPromo() {
  const dispatch = useDispatch()
  const [showLoading, setShowLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const influencers = useAllInfluencer(showLoading);

  
  const handleSubmit = async (values) => {
    if(!isExisting){
      // console.log("values ", values);
      // console.log("values ", values.existingUser);
      let tag = values.code.split(" ").join("").toUpperCase();
      setShowLoading(true);
      let timeExpiry = new Date(values.validUntil).getTime();
      try {
        const res = await saveCoupon({
          ...values,
          validUntil: timeExpiry,
          code: tag,
        });
        if (res) {
          console.log("response is ", res);
          setShowLoading(false);
          res.status ? message.success(res.msg) : message.error(res.msg);
          form.resetFields();
          navigate("/promos");
        } else {
          setShowLoading(false);
        }
      } catch (e) {
        setShowLoading(false);
      }
    }
    else{
      let tag = values.code.split(" ").join("").toUpperCase();
      setShowLoading(true);
      let timeExpiry = new Date(values.validUntil).getTime();
      try {
        const res = await saveCoupon({
          ...values,
          validUntil: timeExpiry,
          code: tag,
        });
        if (res) {
          console.log("response is ", res);
          setShowLoading(false);
          res.status ? message.success(res.msg) : message.error(res.msg);
          form.resetFields();
          navigate("/promos");
        } else {
          setShowLoading(false);
        }
      } catch (e) {
        setShowLoading(false);
      }
      // console.log(values)
      // dispatch(influencerfun(values))
      localStorage.setItem("influencer-coupen", JSON.stringify(values))
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
            name="code"
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
          <Row justify="space-between">
            <Col span={12}>
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
            </Col>
            <Col span={11}>
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
            </Col>
          </Row>

          <Row justify="space-between">
            <Col span={12}>
              <Form.Item
                label="Pic Expiry Date"
                name="validUntil"
                rules={[
                  {
                    required: true,
                    message: "Promo expiry date",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    let customDate = moment().format("YYYY-MM-DD");
                    return (
                      current && current < moment(customDate, "YYYY-MM-DD")
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="How many times a single user can use this coupon"
                name="usageLimit"
              >
                <Input
                  className="input-primary"
                  placeholder="Enter usage limit."
                  type="number"
                  defaultValue={1}
                  min={1}
                />
              </Form.Item>
            </Col>
          </Row>
          {influencers.length > 0 && (
            <Row align="middle" justify="space-between">
              <Col
                span={12}
                style={{
                  paddingTop: "20px",
                }}
              >
                <span>Credits Existing User: </span>
                <Switch onChange={(e) => setIsExisting(e)} />
              </Col>
              {isExisting && (
                <Col span={11}>
                  <Form.Item
                    name="existingUser"
                    rules={[
                      {
                        required: true,
                        message: "Select Existing User",
                      },
                    ]}
                  >
                    <Select placeholder="Chose Existing User" allowClear>
                      {influencers?.map((v) => {
                        return <Option value={v._id}>{v.userName}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>
          )}
          <Form.Item>
            <Space>
              <Button
                htmlType="submit"
              
                style={{
                  backgroundColor: "green",
                  color: "white",
                  marginTop: "15px",
                }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      {/* <h1 onClick={()=>dispatch(influencerfun('us'))}>{name}</h1> */}
    </AppLayout>
  );
}

export default NewPromo;
