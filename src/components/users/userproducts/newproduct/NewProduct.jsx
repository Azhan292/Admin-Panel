import React, { useState } from "react";
import AppLayout from "../../../../layout/AppLayout";
// import { collection, doc, setDoc } from "firebase/firestore";
import { Button, Form, Input, Select, Upload, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./newproduct.scss";
import { uploadImage } from "../../../../APIs/Apis";
import FullPageLoading from "../../../Loading/FullPageLoading";
import { useSelector } from "react-redux";
import { saveProduct } from "../../../../APIs/DatabaseApis";
const { Option } = Select;
const { Dragger } = Upload;
function NewProduct() {
  const { user } = useSelector((state) => state.user);
  console.log("user is ", user);
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const sizeOptions = ["Sm", "Md", "Lg", "xl", "XXl"];
  const typeOptions = ["Tshirts", "Sneakers", "Casquettes", "Chaussettes"];

  const handleSubmit = async (values) => {
    console.log(
      "🚀 ~ file: NewProduct.jsx:24 ~ handleSubmit ~ values:",
      values
    );
    const { image, price, name, discount, ...obj } =
      // console.log("🚀 ~ file: NewProduct.jsx:27 ~ handleSubmit ~ obj:", obj)
      values;
    setShowLoading(true);

    // try {
    //   const imgUrl = await uploadImage(values.image);
    //   const res = await saveProduct({
    //     image: imgUrl,
    //     // fstShippingPrice: Number(fstShippingPrice),
    //     // priorityShippingPrice: Number(priorityShippingPrice),
    //     price: Number(price),
    //     ...obj,
    //   });
    //   if (res) {
    //     form.resetFields();
    //     setShowLoading(false);
    //   } else {
    //     setShowLoading(false);
    //   }
    // } catch (e) {
    //   setShowLoading(false);
    // }
  };
  const handleChange = () => {};
  return (
    <AppLayout>
      {showLoading ? <FullPageLoading /> : null}
      <div className="form">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            label="Size"
            name="size"
            rules={[
              {
                required: true,
                message: "Size is required",
              },
            ]}
          >
            <Select
              onChange={handleChange}
              placeholder="Select product size"
              allowClear
            >
              {sizeOptions?.map((v) => {
                return <Option value={v}>{v}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Type is required",
              },
            ]}
          >
            <Select
              onChange={handleChange}
              placeholder="Select product Type"
              allowClear
            >
              {typeOptions?.map((v) => {
                return <Option value={v}>{v}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Price is required",
              },
            ]}
          >
            <Input
              className="input-primary"
              placeholder="Price"
              type="number"
            />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "1st order discount  Price required",
              },
            ]}
          >
            <Input
              className="input-primary"
              placeholder="1st order discount"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Product Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Image is required",
              },
            ]}
          >
            <Dragger
              listType="picture"
              multiple={false}
              maxCount={1}
              accept={"image/*"}
              onChange={(e) => {
                if (e.file.status === "removed") {
                  form.setFieldValue("image", "");
                } else {
                  form.setFieldValue("image", e.file.originFileObj);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
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

export default NewProduct;
