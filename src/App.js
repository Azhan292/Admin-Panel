import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import FullPageLoading from "./components/Loading/FullPageLoading";
// import { auth } from "./firebase";
// import AppLayout from "./layout/AppLayout";
import {
  userFailure,
  userRequest,
  userSuccess,
} from "./redux/slices/userSlice";
import AllRoutes from "./routes/AllRoutes";
function App() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    dispatch(userRequest());
    const data = localStorage.getItem("user");

    let userAuth = JSON.parse(data);
    if (userAuth) {
      dispatch(userSuccess(userAuth));
    } else dispatch(userFailure(""));
  }, []);
  return loading ? <FullPageLoading /> : <AllRoutes />;
}

export default App;
