import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchElement: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchValue: (state, action) => {
      state.searchElement = action.payload; // Update state with the payload
    },
  },
});

export const { searchValue } = searchSlice.actions;

export default searchSlice.reducer;
