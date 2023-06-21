import React, { useState } from "react";
import "./login.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FullPageLoading from "../../Loading/FullPageLoading";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../firebase";
import { useFormik } from "formik";
import logo from "../../../assets/logo.png";
import * as Yup from "yup";
import ForgotPasswordModal from "../../modals/forgotPassword/ForgotPasswordModal";
import { useMutation } from "@apollo/client";
import { ADMIN_LOGIN } from "../../../Graphql/Mutation/adminMutation";
function Login() {
  const navigate = useNavigate();
  const [isEye, setIsEye] = useState(true);
  const [loadingX, setLoadingX] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [loginAdmin, {loading}] = useMutation(ADMIN_LOGIN)
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email format")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required").min(8),
  });
  const onSubmit = async () => {
    if (formik.values.email && formik.values.password) {
      setLoadingX(true);
      try {
        console.log(2);
        const res = await loginAdmin({
          variables:
            {
              "loginInput": {
                email: formik.values.email,
                password: formik.values.password
              }
            }
          
        }
        );
        console.log("🚀 ~ file: Login.jsx:37 ~ onSubmit ~ res:", res);

        setLoadingX(false);
        const user = res.data.loginAdmin.data;
        console.log("🚀 ~ file: Login.jsx:50 ~ onSubmit ~ user:", user);
        let token = window.btoa(user.token);
        console.log("🚀 ~ file: Login.jsx:51 ~ onSubmit ~ token:", token);
        console.log(user);
        let admin = user;
        delete admin.password;
        localStorage.setItem(
          "user",
          JSON.stringify({ data: admin, token: token })
        );
        navigate("/users");
        console.log(4);
      } catch (e) {
        console.log(11111);
        console.log(JSON.stringify(e));
        setLoadingX(false);
        // setError(e?.message);
        setError(e?.response?.data?.message);
      }
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <ForgotPasswordModal
        showForgotPasswordModal={showForgotPasswordModal}
        setShowForgotPasswordModal={setShowForgotPasswordModal}
      />

      <div className="login">
        {loadingX && <FullPageLoading />}
        <div className="login-form">
          {/* <h1>Hello Again!</h1> */}
          <img className="logo_img" src={logo} alt="" />
          <h2>Welcome to Skalp Admin!</h2>
          {error && (
            <span id="error">
              <b>Error: </b>
              {error}
            </span>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="fields">
              <input
                placeholder="Enter  your email"
                type="email"
                className="field-email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div id="error">{formik.errors.email}</div>
              ) : null}
              <UserOutlined className="icon-user" />
              <div className="password-field">
                <input
                  placeholder="Enter your password"
                  type={isEye ? "password" : "text"}
                  className="field-password"
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div id="error">{formik.errors.password}</div>
                ) : null}
                {isEye ? (
                  <AiFillEye
                    className="icon-eye"
                    onClick={() => setIsEye(!isEye)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="icon-eye"
                    onClick={() => setIsEye(!isEye)}
                  />
                )}
                <LockOutlined className="icon-lock" />
              </div>
            </div>
            <p
              className="forgot"
              onClick={() => setShowForgotPasswordModal(true)}
            >
              Forgot password
            </p>
            <div className="btn">
              <button type="submit">Login </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
