import React from "react";
import "./signup.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Form, Button, Select } from "antd";
import nurse from "../../../assets/nurse.png";
// const { Link } = Anchor;
import { NavLink } from "react-router-dom";
const { Option } = Select;
function Signup() {
  const onFinish = (values) => {
    console.log("values ", values);
  };
  return (
    <div>
      <div className="signup">
        <div className="signup-logo">
          <img src={nurse} />
          <div className="desc">
            <h1>Pro Nurses</h1>
          </div>
        </div>
        <div className="signup-form">
          <h1>Welcome!</h1>
          <h2>Create Your Account!</h2>
          <div className="fields">
            <Form
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your name"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="Password"
                rules={[
                  {
                    required: true,
                    min: 8,
                    max: 30,
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item
                label="User Type"
                name="UserType"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  style={{
                    width: 160,
                  }}
                  placeholder="Select User Type"
                  // onChange={handleChange}
                >
                  <Option value="Employee">Employee</Option>
                  <Option value="Facility">Facility</Option>
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{ offset: 6, span: 16 }}
                className="x-item"
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="btn-submit"
                >
                  Signup
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                Already have an account?<NavLink to="/login"> Login</NavLink>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
