import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterInput",
  initialState: "",
  reducers: {
    filter(state, action) {
      const newstate = action.payload;
      return newstate;
    },
  },
});

export const { filter } = filterSlice.actions;
export default filterSlice.reducer;
