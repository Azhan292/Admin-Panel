import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequest: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
    userSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    },
    userFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload,
      };
    },
  },
});
export const { userRequest, userSuccess, userFailure } = userSlice.actions;
export default userSlice.reducer;
