import { configureStore } from "@reduxjs/toolkit";
import searchElementReducer from "../slice/searchSlice";

export default configureStore({
  reducer: {
    searchElement: searchElementReducer,
  },
});
